import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Setting Up Router
import { BrowserRouter } from "react-router-dom";

// Setting Up Redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import thunk from "redux-thunk";

import coursesReducer from "./store/reducers/coursesReducer";
import levelsReducer from "./store/reducers/levelsReducer";
import mainReducer from "./store/reducers/mainReducer";
import gameLevelReducer from "./store/reducers/gameLevelReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  coursesReducer: coursesReducer,
  levelsReducer: levelsReducer,
  mainReducer: mainReducer,
  gameLevelReducer: gameLevelReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
