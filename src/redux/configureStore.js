import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';

import * as apis from 'apis';

import { rootEpic, createRootReducer } from './modules/root';

// create middlewares
export const epicMiddleware = createEpicMiddleware({
    dependencies: { apis }
});
export const history = createBrowserHistory({
    basename: '/'
});
const middlewares = [epicMiddleware, routerMiddleware(history)];

// chrome develop extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
export const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(...middlewares))
);

// run after create store
epicMiddleware.run(rootEpic);
