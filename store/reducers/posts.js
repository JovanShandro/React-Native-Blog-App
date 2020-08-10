import * as R from "ramda";

const initialState = {};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE":
      return R.set(
        R.lensProp(action.id),
        R.mergeRight(R.prop(action.id)(state), action.updates),
        state
      );
    case "DELETE":
      const stateCopy = R.clone(state);
      delete stateCopy[action.id];
      return stateCopy;
    case "ADD":
      return { ...state, [action.id]: action.post };
    case "CLEAR_POSTS":
      return {};
    default:
      return state;
  }
};

export default postsReducer;
