const express = require("express");
const arbitrager = require("./arbitrager");

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/hello", (req, res) => {
    res.send({express: 'Hello From Express'});
});

app.get("/api/orderBook", (req, res) => {
    res.send(arbitrager.orderBook);
});

app.listen(port, () => console.log(`Listening on port ${port}\n${Date()}`));

console.log();
