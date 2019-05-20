import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { CheckoutPage } from './components/CheckoutPage/index';
import { HomePage } from './components/HomePage/index';
import { store } from './store/index';

ReactDOM.render(
    <Provider store={store} >
        <HashRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/checkout-tickets/:showName" component={CheckoutPage} />
            </Switch>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));
