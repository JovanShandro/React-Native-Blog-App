import authReducer from "./auth";
import postsReducer from "./posts";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  auth: authReducer,
  posts: postsReducer
});

export default allReducers;
