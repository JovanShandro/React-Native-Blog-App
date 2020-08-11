import {
  PostsState,
  PostAction,
  PostUpdateAction,
  PostCreateAction
} from "../../lib/types";
const R = require("ramda");

const initialState = {};

const postsReducer = (
  state: PostsState = initialState,
  action: PostAction
): PostsState => {
  switch (action.type) {
    case "UPDATE":
      return R.set(
        R.lensProp(action.id),
        R.mergeRight(
          R.prop(action.id)(state),
          (action as PostUpdateAction).updates
        ),
        state
      );
    case "DELETE":
      const stateCopy = R.clone(state);
      delete stateCopy[action.id];
      return stateCopy;
    case "ADD":
      return { ...state, [action.id]: (action as PostCreateAction).post };
    case "CLEAR_POSTS":
      return {};
    default:
      return state;
  }
};

export default postsReducer;
