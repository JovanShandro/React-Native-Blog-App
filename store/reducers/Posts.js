import * as R from "ramda";
import { firebaseDb, firebaseAuth } from "../../lib/firebase";

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
      const stateCopy = JSON.parse(JSON.stringify(state));
      delete stateCopy[action.id];
      return stateCopy;
    case "ADD":
      return R.mergeRight(state, { [action.id]: action.post });
    case "CLEAR_POSTS":
      return {};
    default:
      return state;
  }
};

export default postsReducer;
