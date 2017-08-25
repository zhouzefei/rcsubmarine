import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';

const store = (history) => {
    let middlewares = [ thunk, routerMiddleware(history) ];
    return createStore(reducers, applyMiddleware(...middlewares)) ;
};

export default store;
