import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/rootreducer';
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;