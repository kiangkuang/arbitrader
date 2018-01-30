import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import PriceLadderContainer from "./components/PriceLadderContainer";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';

export default class App extends Component {
    state = {
        response: ''
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({response: res.express}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        return (
            <div className="App">
                <Container fluid>
                    <Row>
                        <Col xs="12" lg="6" xl="4" className="my-3"><PriceLadderContainer product="btcusd"/></Col>
                        <Col xs="12" lg="6" xl="4" className="my-3"><PriceLadderContainer product="btcjpy"/></Col>
                        <Col xs="12" lg="6" xl="4" className="my-3"><PriceLadderContainer product="btcsgd"/></Col>
                        <Col xs="12" lg="6" xl="4" className="my-3"><PriceLadderContainer product="ethusd"/></Col>
                        <Col xs="12" lg="6" xl="4" className="my-3"><PriceLadderContainer product="ethjpy"/></Col>
                        <Col xs="12" lg="6" xl="4" className="my-3"><PriceLadderContainer product="ethsgd"/></Col>
                        <Col xs="12" lg="6" xl="4" className="my-3"><PriceLadderContainer product="ethbtc"/></Col>
                        <Col xs="12" lg="6" xl="4" className="my-3"><PriceLadderContainer product="qashjpy"/></Col>
                        <Col xs="12" lg="6" xl="4" className="my-3"><PriceLadderContainer product="qasheth"/></Col>
                        <Col xs="12" lg="6" xl="4" className="my-3"><PriceLadderContainer product="qashbtc"/></Col>
                        <Col xs="12" lg="6" xl="4" className="my-3"><PriceLadderContainer product="qashusd"/></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}