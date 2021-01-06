import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from './rootReducer';

const history = createBrowserHistory();

const rootReducer = createRootReducer(history);

declare global {
  interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(routerMiddleware(history)),
      composeEnhancers
    )
  );

  return {
    store,
    history,
  };
}
