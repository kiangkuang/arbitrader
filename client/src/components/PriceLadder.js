import React, {Component} from "react";
import {Table} from 'reactstrap';
import accounting from "accounting";


export default class PriceLadder extends Component {
    static defaultProps = {
        data: []
    };

    render() {
        let totalPrice = this.props.data.reduce((curr, row) => {
            return curr + accounting.parse(row[0]) * accounting.parse(row[1]);
        }, 0);
        let totalQuantity = this.props.data.reduce((curr, row) => {
            return curr + accounting.parse(row[1]);
        }, 0);
        let average = totalPrice / totalQuantity;

        return (
            <div>
                <h5 className="text-muted">{average ? average : null}</h5>
                <Table size="sm" responsive bordered>
                    <thead>
                    <tr>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.slice(0, 5).map(row =>
                        <tr key={row[0]}>
                            <td>{accounting.toFixed(row[0], 5)}</td>
                            <td>{accounting.toFixed(row[1], 5)}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        );
    }
}