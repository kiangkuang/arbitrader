const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const Quoinex = require("./quoinex");
const Market = require("./market");
const Graph = require("./graph");

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}\n${Date()}`));

const markets = {
    btcusd: new Market("btc", "usd", 0.001),
    btcjpy: new Market("btc", "jpy", 0.001),
    btcsgd: new Market("btc", "sgd", 0.001),
    ethusd: new Market("eth", "usd", 0.01),
    ethjpy: new Market("eth", "jpy", 0.01),
    ethsgd: new Market("eth", "sgd", 0.01),
    ethbtc: new Market("eth", "btc", 0.01),
    qashjpy: new Market("qash", "jpy", 1),
    qasheth: new Market("qash", "eth", 1),
    qashbtc: new Market("qash", "btc", 1),
    qashusd: new Market("qash", "usd", 1)
};

const quoinex = new Quoinex(markets);
quoinex.onChange(() => {
    io.emit("markets", markets);
});

app.get("/api/markets", (req, res) => {
    res.send(markets);
});

app.get("/api/graph", (req, res) => {
    res.send(new Graph(markets));
});

app.get("/api/cycle", (req, res) => {
    let multiplier = 1;
    const cycle = new Graph(markets).cycle;

    for (let i = 0; i < cycle.length - 1; i++) {
        if (markets.hasOwnProperty(cycle[i] + cycle[i + 1])) {
            multiplier *= markets[cycle[i] + cycle[i + 1]].minOrders.buy.price
        }
        if (markets.hasOwnProperty(cycle[i + 1] + cycle[i])) {
            multiplier /= markets[cycle[i + 1] + cycle[i]].minOrders.sell.price
        }
    }

    res.send({
        cycle,
        multiplier
    });
});
