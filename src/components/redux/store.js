import { createStore ,applyMiddleware,compose} from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";
import logger from 'redux-logger'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
      composeEnhancers(applyMiddleware(thunk,logger))
);

export default store;
