import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import PriceLadderContainer from "./PriceLadderContainer";

export default class OrderBook extends Component {
    render() {
        return (
            <Row>
                {Object.keys(this.props.orderBook).map(product =>
                    <Col key={product} xs="12" lg="6" xl="4" className="my-3">
                        <PriceLadderContainer product={product} data={this.props.orderBook[product]}/>
                    </Col>
                )};
            </Row>
        )
    }
}