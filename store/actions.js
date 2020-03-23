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

export const signin = () => {
  return {
    type: "SIGN_IN"
  };
};

export const signout = () => {
  return {
    type: "SIGN_OUT"
  };
};
