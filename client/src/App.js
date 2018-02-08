import React, {Component} from "react";
import {Container} from "reactstrap";
import io from "socket.io-client";
import OrderBook from "./components/OrderBook";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

export default class App extends Component {
    state = {
        markets: {}
    };

    componentDidMount() {
        const socket = io();
        socket.on('markets', data => {
            this.setState({markets: data});
        });
    }

    render() {
        return (
            <div className="App">
                <Container fluid>
                    <h1 className="display-4">Minimum Accumulated Orders</h1>
                    <OrderBook orderBook={this.state.markets}/>
                </Container>
            </div>
        );
    }
}