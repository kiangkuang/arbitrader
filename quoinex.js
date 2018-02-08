const Pusher = require("pusher-js");

const pusher = new Pusher("2ff981bb060680b5ce97", {
    wsHost: "ws.pusherapp.com",
    wsPort: 80,
    enabledTransports: ["ws", "flash"],
    disabledTransports: ["flash"]
});

module.exports = class Quoinex {
    constructor(markets) {
        this.markets = markets;
        this._onChange = () => {
        };

        Object.keys(markets).forEach(market => {
            ["buy", "sell"].forEach(type => {
                pusher.subscribe(`price_ladders_cash_${market}_${type}`)
                    .bind("updated", (data) => {
                        markets[market].orders[type] = data;
                        this._onChange();
                    });
            });
        });
    }

    get minOrders() {
        const result = {};
        Object.keys(this.markets).forEach(market => {
            result[market] = this.markets[market].minOrders;
        });
        return result;
    }

    onChange(callback) {
        this._onChange = callback;
    }
};