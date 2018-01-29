import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Pusher from 'pusher-js';
import { setPusherClient } from 'react-pusher';

const pusher = new Pusher("2ff981bb060680b5ce97", {
    wsHost: "ws.pusherapp.com",
    wsPort: 80,
    enabledTransports: ["ws", "flash"],
    disabledTransports: ["flash"]
});
setPusherClient(pusher);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
