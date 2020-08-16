import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducers";
import ReduxThunk from "redux-thunk";

export const middlewares = [ReduxThunk];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default createStoreWithMiddleware(rootReducer);
