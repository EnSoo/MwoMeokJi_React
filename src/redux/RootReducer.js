import { combineReducers } from "redux";
import userAccountReducer from "./userAccount";

const RootReducer= combineReducers({userAccountReducer,})

export default RootReducer