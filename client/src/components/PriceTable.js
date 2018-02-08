import React, {Component} from "react";
import {Table} from 'reactstrap';

export default class PriceTable extends Component {
    static defaultProps = {
        data: []
    };

    render() {
        return (
            <Table size="sm" responsive bordered>
                <thead>
                <tr>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{Number(this.props.data.price.toPrecision(7))}</td>
                    <td>{Number(this.props.data.quantity.toPrecision(7))}</td>
                </tr>
                </tbody>
            </Table>
        );
    }
}