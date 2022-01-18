import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getCategoriesReducer } from './reducers/categoryReducer.js';
import { getAllImagesReducer } from './reducers/imageReducer.js';
import thunk from 'redux-thunk';
// const reduxLogger = require('redux-logger');
// const logger = reduxLogger.createLogger();

const rootReducer = combineReducers({ getCategoriesReducer, getAllImagesReducer })

const middleware = [thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;