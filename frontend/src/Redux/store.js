import { legacy_createStore, applyMiddleware,combineReducers} from "redux";
import {thunk }from "redux-thunk";
import { HrmReducer } from "./HrmReducer";


const rootReducer = combineReducers({
    HrmReducer
  });

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
