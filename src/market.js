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
        this.minOrders = {
            buy: {},
            sell: {}
        };
    }

    updateOrders(type, orders) {
        this.orders[type] = orders.map(order => {
            return {
                price: accounting.parse(order[0]),
                quantity: accounting.parse(order[1])
            }
        });
        this.minOrders[type] = this.getMinOrder(type);
    };

    getMinOrder(type) {
        const accumulateOrder = this.getAccumulate(type);
        return accumulateOrder[accumulateOrder.length - 1];
    }

    getAccumulate(type) {
        const result = [];
        for (let i = 0; i < this.orders[type].length; i++) {
            const item = this.orders[type].slice(0, i + 1).reduce((previous, current) => {
                const totalCost = previous.price * previous.quantity + current.price * current.quantity;
                const quantity = previous.quantity + current.quantity;
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
};