import { combineReducers } from "redux";
import userAccountReducer from "./userAccount";
import recipeReducer from "./recipeReducer";

const RootReducer= combineReducers({userAccountReducer,recipeReducer})

export default RootReducer