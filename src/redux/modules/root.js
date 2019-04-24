import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import { components, componentsEpics } from './components';

export const rootEpic = combineEpics(componentsEpics);

// root reducer
export const createRootReducer = history => {
    const appReducer = combineReducers({
        router: connectRouter(history),
        components
    });

    return appReducer;
};
