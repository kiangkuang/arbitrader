import React, {Component} from "react";
import {Container} from "reactstrap";
import io from "socket.io-client";
import OrderBook from "./components/OrderBook";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

export default class App extends Component {
    state = {
        orderBook: {}
    };

    componentDidMount() {
        const socket = io();
        socket.on('orderBook', data => {
            this.setState({orderBook: data});
        });
    }

    render() {
        return (
            <div className="App">
                <Container fluid>
                    <OrderBook orderBook={this.state.orderBook}/>
                </Container>
            </div>
        );
    }
}