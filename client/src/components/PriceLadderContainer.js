import React, {Component} from 'react';
import Pusher from "react-pusher";
import {Row, Col, Card, CardHeader, CardBody, CardSubtitle} from 'reactstrap';
import PriceLadder from "./PriceLadder";
import accounting from "accounting";

export default class PriceLadderContainer extends Component {
    state = {
        buy: [],
        sell: []
    };

    getAccumulatedAverage(data) {
        for (var i = 0; i < data.length; i++) {
            let partition = data.slice(0, i + 1);

            let totalPrice = partition.reduce((curr, row) => {
                return curr + accounting.parse(row[0]) * accounting.parse(row[1]);
            }, 0);

            let totalQuantity = partition.reduce((curr, row) => {
                return curr + accounting.parse(row[1]);
            }, 0);
            
            data[i].push(totalPrice / totalQuantity);
        }
        return data;
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>{this.props.product.toUpperCase()}</CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                <CardSubtitle>Buy</CardSubtitle>
                                <PriceLadder data={this.getAccumulatedAverage(this.state.buy)}/>
                            </Col>
                            <Col>
                                <CardSubtitle>Sell</CardSubtitle>
                                <PriceLadder data={this.getAccumulatedAverage(this.state.sell)}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Pusher
                    channel={"price_ladders_cash_" + this.props.product + "_buy"}
                    event="updated"
                    onUpdate={data => this.setState({buy: data})}
                />
                <Pusher
                    channel={"price_ladders_cash_" + this.props.product + "_sell"}
                    event="updated"
                    onUpdate={data => this.setState({sell: data})}
                />
            </div>
        )
    }
}