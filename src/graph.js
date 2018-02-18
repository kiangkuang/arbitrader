module.exports = class Graph {
    constructor(markets) {
        this.cycle = [];
        this.distance = {};
        this.previous = {};
        this.vertices = [];
        this.edges = [];

        Object.keys(markets).forEach(m => {
            const market = markets[m];

            if (!this.vertices.includes(market.curr1)) {
                this.vertices.push(market.curr1);
            }
            if (!this.vertices.includes(market.curr2)) {
                this.vertices.push(market.curr2);
            }

            if (market.minOrders.buy.price) {
                this.edges.push({
                    from: market.curr1,
                    to: market.curr2,
                    type: "buy",
                    exchangeRate: market.minOrders.buy.price,
                    weight: -1 * Math.log(market.minOrders.buy.price)
                });
            }
            if (market.minOrders.sell.price) {
                this.edges.push({
                    from: market.curr2,
                    to: market.curr1,
                    type: "sell",
                    exchangeRate: 1 / market.minOrders.sell.price,
                    weight: -1 * Math.log(1 / market.minOrders.sell.price)
                });
            }
        });

        this.cycle = this.bellmanFord();
    }

    bellmanFord(start = "usd", cycleSize = 3) {
        this.vertices.forEach(vertex => {
            this.distance[vertex] = Infinity;
            this.previous[vertex] = null;
        });

        this.distance[start] = 0;

        this.vertices.forEach(() => {
            this.edges.forEach(edge => {
                if (this.canRelax(edge)) {
                    this.relax(edge);
                }
            });
        });

        for (let i = 0; i < this.edges.length; i++) {
            let edge = this.edges[i];
            if (this.canRelax(edge)) {
                let curr = edge.to;
                const cycle = [];

                for (let i = 0; i <= cycleSize; i++) {
                    cycle.unshift(curr);
                    curr = this.previous[curr];
                }

                if (cycle[0] === cycle[cycle.length - 1]) {
                    return cycle;
                }
            }
        }
        return [];
    }

    canRelax(edge) {
        return this.distance[edge.from] + edge.weight < this.distance[edge.to];
    }

    relax(edge) {
        this.distance[edge.to] = this.distance[edge.from] + edge.weight;
        this.previous[edge.to] = edge.from;
    }
};