import { firebaseAuth } from "../../lib/firebase";

const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "LOGIN":
      return true;
    case "LOGOUT":
      firebaseAuth.signOut();
      return false;
    case "AUTH_STATE_CHANGE":
      return state;
    default:
      return state;
  }
};

export default loggedReducer;
