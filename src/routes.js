import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {
	App,
	Home,
	Login,
	NotFound
} from './containers';

import { isLoggedIn } from './utils';

const checkAuth = () => {
	return isLoggedIn();
}

const PublicRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => {
		return checkAuth() ? (
			<Redirect to={{ pathname: `/` }} />
		) :
			(
				<Component {...props} />
			)
	}} />
)

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => {
		return checkAuth() ? (
			<App {...props}>
				<Component {...props} />
			</App>
		) :
			(
				<Redirect to={{ pathname: `/login` }} />
			)
	}} />
)

export default class Routes extends React.Component {
	render() {
		return (
			<BrowserRouter>
                <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <PublicRoute path='/login' component={Login} />
                    <Route component={NotFound} />
                </Switch>
			</BrowserRouter>
		)
	}
}
