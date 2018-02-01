import React, {Component} from "react";
import {Table} from 'reactstrap';

export default class PriceLadder extends Component {
    static defaultProps = {
        data: []
    };

    render() {
        return (
            <div>
                <Table size="sm" responsive bordered>
                    <thead>
                    <tr>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Price<sub className="text-muted">AccAvg</sub></th>
                        <th>Quantity<sub className="text-muted">Acc</sub></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.slice(0, 3).map(row =>
                        <tr key={row.price}>
                            <td>{Number(row.price.toPrecision(7))}</td>
                            <td>{Number(row.quantity.toPrecision(7))}</td>
                            <td>{Number(row.accumulatePrice.toPrecision(7))}</td>
                            <td>{Number(row.accumulateQuantity.toPrecision(7))}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        );
    }
}