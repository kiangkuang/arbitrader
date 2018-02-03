const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const quoinex = require("./quoinex");

const port = process.env.PORT || 5000;

app.get("/api/orderBook", (req, res) => {
    res.send(quoinex.orderBook);
});

app.get("/api/getAllMinOrderPrices", (req, res) => {
    res.send(quoinex.getAllMinOrderPrices());
});

quoinex.onChange(() => {
    io.emit('orderBook', quoinex.orderBook);
});

server.listen(port, () => console.log(`Listening on port ${port}\n${Date()}`));
