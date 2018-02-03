module.exports = class Market {
    constructor(curr1, curr2, minQuantity) {
        this.curr1 = curr1;
        this.curr2 = curr2;
        this.minQuantity = minQuantity;
        this.marketName = curr1 + curr2;
        this.buy = [];
        this.sell = [];
    }

    get accumulateBuy() {
        return this.accumulate("buy");
    }

    get accumulateSell() {
        return this.accumulate("sell");
    }

    accumulate(type) {
        const result = [];
        for (let i = 0; i < this[type].length; i++) {
            const item = this[type].slice(0, i + 1).reduce((previous, current) => {
                const totalCost = previous.price * previous.quantity + current.price * current.quantity;
                const quantity = previous.quantity + current.quantity;
                const price = totalCost / quantity;
                return {
                    price,
                    quantity
                }
            });

            result.push(item);

            if (item.quantity >= this.minQuantity) {
                break
            }
        }
        return result;
    }

    get minOrderBuy() {
        return this.minOrder("buy");
    }

    get minOrderSell() {
        return this.minOrder("sell");
    }

    minOrder(type) {
        type = type.charAt(0).toUpperCase() + type.slice(1);
        return this["accumulate" + type][this["accumulate" + type].length - 1];
    }
};