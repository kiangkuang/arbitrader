const accounting = require("accounting");

module.exports = class Market {
    constructor(curr1, curr2, minQuantity) {
        this.curr1 = curr1;
        this.curr2 = curr2;
        this.minQuantity = minQuantity;
        this.marketName = curr1 + curr2;
        this.orders = {
            buy: [],
            sell: []
        };
    }

    get accumulateOrders() {
        return {
            buy: this.accumulate("buy"),
            sell: this.accumulate("sell")
        };
    }

    get minOrders() {
        return {
            buy: this.minOrder("buy"),
            sell: this.minOrder("sell")
        };
    }

    accumulate(type) {
        const result = [];
        for (let i = 0; i < this.orders[type].length; i++) {
            const item = this.orders[type].slice(0, i + 1).reduce((previous, current) => {
                const currentPrice = accounting.parse(current[0]);
                const currentQuantity = accounting.parse(current[1]);
                const totalCost = previous.price * previous.quantity + currentPrice * currentQuantity;
                const quantity = previous.quantity + currentQuantity;
                const price = totalCost / quantity;
                return {
                    price,
                    quantity
                }
            }, {
                price: 0,
                quantity: 0
            });

            result.push(item);

            if (item.quantity >= this.minQuantity) {
                return result;
            }
        }
        return result;
    }

    minOrder(type) {
        return this.accumulateOrders[type][this.accumulateOrders[type].length - 1];
    }
};