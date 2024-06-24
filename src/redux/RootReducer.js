import { combineReducers } from "redux";
import userAccountReducer from "./userAccount";
import recipeReducer from "./recipeReducer";
import weatherReducer from "./weatherReducer";

const RootReducer= combineReducers({userAccountReducer,recipeReducer,weatherReducer})

export default RootReducer