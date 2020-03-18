const update = (id, updates) => {
  return {
    type: "UPDATE",
    id,
    updates
  };
};

const add = () => {
  return {
    type: "ADD"
  };
};

const delete = id => {
  return {
    type: "DELETE",
    id
  };
};

const signin = () => {
  return {
    type: "SIGN_IN"
  };
};

const signout = () => {
  return {
    type: "SIGN_OUT"
  };
};

export { delete, update, add, signout, signin };
