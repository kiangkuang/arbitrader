const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const arbitrager = require("./arbitrager");

const port = process.env.PORT || 5000;

app.get("/api/orderBook", (req, res) => {
    res.send(arbitrager.orderBook);
});

arbitrager.onChange(() => {
    io.emit('orderBook', arbitrager.orderBook);
});

server.listen(port, () => console.log(`Listening on port ${port}\n${Date()}`));
