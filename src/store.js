import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';

export default createStore(
reducers,
applyMiddleware(thunk),
);
