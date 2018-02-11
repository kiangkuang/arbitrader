import React, {Component} from 'react';
import {Card, CardBody, CardHeader, CardSubtitle, Col, Row} from 'reactstrap';
import PriceTable from "./PriceTable";

export default class PriceTablesContainer extends Component {
    render() {
        return (
            <Card>
                <CardHeader>{this.props.product.toUpperCase()}</CardHeader>
                <CardBody>
                    <Row>
                        {Object.keys(this.props.data.minOrders).sort().map(type =>
                            <Col key={type} sm="6">
                                <CardSubtitle className="text-muted">{type.toUpperCase()}</CardSubtitle>
                                <PriceTable data={this.props.data.minOrders[type]}/>
                            </Col>
                        )}
                    </Row>
                </CardBody>
            </Card>
        )
    }
}