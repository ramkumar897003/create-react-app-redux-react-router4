import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './init';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router';
import Routes from './routes';

const history = createBrowserHistory(store);

ReactDOM.render(
<Provider store={store}>
    <Router history={history}>
        <Routes />
    </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
