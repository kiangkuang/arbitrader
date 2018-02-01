import React, {Component} from 'react';
import {Card, CardBody, CardHeader, CardSubtitle, Col, Row} from 'reactstrap';
import PriceLadder from "./PriceLadder";

export default class PriceLadderContainer extends Component {
    render() {
        return (
            <Card>
                <CardHeader>{this.props.product.toUpperCase()}</CardHeader>
                <CardBody>
                    <Row>
                        {Object.keys(this.props.data).sort().map(type =>
                            <Col key={type}>
                                <CardSubtitle className="text-muted">{type.toUpperCase()}</CardSubtitle>
                                <PriceLadder data={this.props.data[type]}/>
                            </Col>
                        )}
                    </Row>
                </CardBody>
            </Card>
        )
    }
}