import { firebaseAuth } from "../../lib/firebase";

const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "LOGIN":
      return true;
    case "LOGOUT":
      return false;
    default:
      return state;
  }
};

export default loggedReducer;
