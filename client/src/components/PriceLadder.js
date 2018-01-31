import React, {Component} from "react";
import {Table} from 'reactstrap';
import accounting from "accounting";


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
                        <th>Price<sub class="text-muted">AccAvg</sub></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.slice(0, 5).map(row =>
                        <tr key={row[0]}>
                            <td>{accounting.toFixed(row[0], 5)}</td>
                            <td>{accounting.toFixed(row[1], 5)}</td>
                            <td>{accounting.toFixed(row[2], 5)}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        );
    }
}