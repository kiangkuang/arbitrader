const accounting = require("accounting");
const Pusher = require("pusher-js");

const pusher = new Pusher("2ff981bb060680b5ce97", {
    wsHost: "ws.pusherapp.com",
    wsPort: 80,
    enabledTransports: ["ws", "flash"],
    disabledTransports: ["flash"]
});

const products = [
    "btcusd", "btcjpy", "btcsgd",
    "ethusd", "ethjpy", "ethsgd", "ethbtc",
    "qashjpy", "qasheth", "qashbtc", "qashusd"
];

const orderBook = {};
products.forEach(product => {
    orderBook[product] = {};
});

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

products.forEach(product => {
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
                orderBook[product][type] = orders;
                _onChange(product, type);
            });
    });
});

module.exports = {
    orderBook,
    onChange
};
