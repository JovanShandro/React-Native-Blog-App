import loggedReducer from "./isLoggedIn";
import postsReducer from "./Posts";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLoggedIn: loggedReducer,
  posts: postsReducer
});

export default allReducers;
