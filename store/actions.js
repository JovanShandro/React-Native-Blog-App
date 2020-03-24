//Posts
export const updatePost = (id, updates) => {
  return {
    type: "UPDATE",
    id,
    updates
  };
};

export const addPost = data => {
  return {
    type: "ADD",
    data
  };
};

export const deletePost = id => {
  return {
    type: "DELETE",
    id
  };
};

//Auth

export const loginUser = () => {
  return {
    type: "LOGIN"
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT"
  };
};

//export const handleAuthStateChange = () => {
//return {
//type: "AUTH_STATE_CHANGE"
//};
//};
