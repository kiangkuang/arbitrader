import React, { Component } from 'react';
import Pusher from 'react-pusher';

const products = [
    "btcusd",
    "btcjpy",
    "btcsgd",
    "ethusd",
    "ethjpy",
    "ethsgd",
    "ethbtc",
    "qashjpy",
    "qasheth",
    "qashbtc",
    "qashusd"
];

const pusherComponents = products.map(product =>
    <div>
        <Pusher
            channel={"price_ladders_cash_" + product + "_buy"}
            event="updated"
            onUpdate={data => console.log(data)}
        />
        <Pusher
            channel={"price_ladders_cash_" + product + "_sell"}
            event="updated"
            onUpdate={data => console.log(data)}
        />
    </div>
);

class PriceLadders extends Component {
    render() {
        return (
            <div>
                {pusherComponents}
            </div>
        );
    }
}

export default PriceLadders;