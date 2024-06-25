import { combineReducers } from "redux";
import userAccountReducer from "./userAccount";
import recipeReducer from "./recipeReducer";
import weatherReducer from "./weatherReducer";
import isAndroidReducer from "./isAndroidReducer"

const RootReducer= combineReducers({userAccountReducer,recipeReducer,weatherReducer,isAndroidReducer})

export default RootReducer