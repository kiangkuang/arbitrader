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
                        this.markets[market].updateOrders(type, data);
                        this._onChange();
                    });
            });
        });
    }

    onChange(callback) {
        this._onChange = callback;
    }
};