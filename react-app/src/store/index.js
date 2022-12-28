import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import commentDetailsReducer from "./commentDetails";
import postDetailsReducer from "./postDetails";
import postsReducer from "./posts";
import sessionReducer from "./session";
import uiReducer from "./ui";

const rootReducer = combineReducers({
    session: sessionReducer,
    ui: uiReducer,
    posts: postsReducer,
    postDetails: postDetailsReducer,
    commentDetails: commentDetailsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require("redux-logger").default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
