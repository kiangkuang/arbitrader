import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import PriceTablesContainer from "./PriceTablesContainer";

export default class OrderBook extends Component {
    render() {
        return (
            <Row>
                {Object.keys(this.props.orderBook).map(market =>
                    <Col key={market} xs="12" md="6" xl="4" className="my-3">
                        <PriceTablesContainer product={market} data={this.props.orderBook[market]}/>
                    </Col>
                )}
            </Row>
        )
    }
}