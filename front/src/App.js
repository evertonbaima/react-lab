import React, { Component } from 'react';
import { routerMiddleware } from 'react-router-redux';
import { Route, IndexRoute, Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import DevTools from './containers/DevTools';
import { ENV_PRODUCTION } from './Util';

// CONTAINERS
import Index from './templates/index';

// PÁGINAS
import InicioPage from './pages/inicio';

import configureStore from './store/configureStore';
import './App.css';

const middleware = routerMiddleware(hashHistory);

const store = configureStore(middleware);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router history={hashHistory}>
                        <Route path="/" component={Index}>
                            <IndexRoute component={InicioPage} />
                            <Route path="/" component={InicioPage} />
                        </Route>
                    </Router>
                    {(process.env.NODE_ENV === ENV_PRODUCTION) ? null : <DevTools />}
                </div>
            </Provider>
        );
    }
}

export default App;
