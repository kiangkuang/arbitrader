const accounting = require("accounting");
const Pusher = require("pusher-js");

const pusher = new Pusher("2ff981bb060680b5ce97", {
    wsHost: "ws.pusherapp.com",
    wsPort: 80,
    enabledTransports: ["ws", "flash"],
    disabledTransports: ["flash"]
});

const products = {
    btcusd: 0.001,
    btcjpy: 0.001,
    btcsgd: 0.001,
    ethusd: 0.01,
    ethjpy: 0.01,
    ethsgd: 0.01,
    ethbtc: 0.01,
    qashjpy: 1,
    qasheth: 1,
    qashbtc: 1,
    qashusd: 1
};

const orderBook = {};

const getAllMinOrderPrices = () => {
    const result = {};
    Object.keys(orderBook).forEach(product => {
        result[product] = {};
        Object.keys(orderBook[product]).forEach(type => {
            result[product][type] = getMinOrderPrice(product, type);
        });
    });
    return result;
};

const getMinOrderPrice = (product, type) => {
    return orderBook[product][type].find(row => {
        return row.accumulateQuantity >= products[product];
    }).accumulatePrice;
};

let _onChange = (product, type) => {
};
const onChange = callback => {
    _onChange = callback;
};

const accumulateQuantity = (data, count) => {
    return data.slice(0, count + 1)
        .reduce((sum, curr) => {
            let quantity = accounting.parse(curr[1]);
            return sum + quantity
        }, 0);
};

const accumulateCost = (data, count) => {
    return data.slice(0, count + 1)
        .reduce((sum, curr) => {
            let price = accounting.parse(curr[0]);
            let quantity = accounting.parse(curr[1]);
            return sum + price * quantity;
        }, 0)
};

Object.keys(products).forEach(product => {
    ["buy", "sell"].forEach(type => {
        pusher.subscribe(`price_ladders_cash_${product}_${type}`)
            .bind("updated", (data) => {
                let orders = [];
                for (let i = 0; i < data.length; i++) {
                    let accCost = accumulateCost(data, i);
                    let accQuantity = accumulateQuantity(data, i);
                    orders.push({
                        price: accounting.parse(data[i][0]),
                        quantity: accounting.parse(data[i][1]),
                        accumulatePrice: accCost / accQuantity,
                        accumulateQuantity: accQuantity
                    });
                }

                if (orderBook[product] === undefined) {
                    orderBook[product] = {};
                }
                orderBook[product][type] = orders;
                _onChange(product, type);
            });
    });
});

module.exports = {
    orderBook,
    getAllMinOrderPrices,
    onChange
};
