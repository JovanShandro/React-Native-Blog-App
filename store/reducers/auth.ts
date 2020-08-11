import { AuthState } from "../../lib/types";
import { Action } from "redux";

const loggedReducer = (
  state: AuthState = { isLoggedIn: false },
  action: Action
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default loggedReducer;
