import React, {Component} from 'react';
import Pusher from "react-pusher";
import {Row, Col, Card, CardHeader, CardBody, CardSubtitle} from 'reactstrap';
import PriceLadder from "./PriceLadder";

export default class PriceLadderContainer extends Component {
    state = {
        buy: [],
        sell: []
    };

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>{this.props.product.toUpperCase()}</CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                <CardSubtitle>Buy</CardSubtitle>
                                <PriceLadder data={this.state.buy}/>
                            </Col>
                            <Col>
                                <CardSubtitle>Sell</CardSubtitle>
                                <PriceLadder data={this.state.sell}/>
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