import { createStore, compose } from 'redux';

import rootReducer from './reducers';
import { setJSONAndPathExpression } from './actions';
import data from '../example.json';

const { NODE_ENV } = process.env;

export const store = createStore(
  rootReducer,
  compose(
    NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
  ),
);

store.dispatch(setJSONAndPathExpression(data, '$..author'));