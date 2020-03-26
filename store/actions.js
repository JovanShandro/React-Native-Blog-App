import { firebaseDb, firebaseAuth } from "../lib/firebase";

//Posts
const updatePost = (id, updates) => {
  return {
    type: "UPDATE",
    id,
    updates
  };
};

const deletePost = id => {
  return {
    type: "DELETE",
    id
  };
};

const addPost = (id, post) => {
  return {
    type: "ADD",
    id,
    post
  };
};

const clearPosts = () => {
  return {
    type: "CLEAR_POSTS"
  };
};

//Auth
const loginUser = () => {
  return {
    type: "LOGIN"
  };
};

const logoutUser = () => {
  return {
    type: "LOGOUT"
  };
};

// Async Action creaters
const getPosts = () => async dispatch => {
  let userPosts;
  userPosts = await firebaseDb.ref("posts/" + firebaseAuth.currentUser.uid);
  userPosts
    .on("child_added", snapshot => {
      const post = snapshot.val();
      const id = snapshot.key;
      dispatch(addPost(id, post));
    })
    .catch(err => console.log(err.message));
  // child changed
  userPosts
    .on("child_changed", snapshot => {
      const post = snapshot.val();
      const id = snapshot.key;
      dispatch(updatePost(id, post));
    })
    .catch(err => console.log(err.message));
};

const fbAddPost = data => async dispatch => {
  // call twice to make almost sure not same id generated twice
  const randomId =
    Math.random()
      .toString()
      .split(".")[1] +
    Math.random()
      .toString()
      .split(".")[1];

  const ref = firebaseDb.ref(
    "posts/" + firebaseAuth.currentUser.uid + "/" + randomId
  );

  ref.set(data, err => {
    if (err) {
      console.log(err.message);
    }
  });
};

const fbDeletePost = id => async dispatch => {
  const ref = firebaseDb.ref(
    "posts/" + firebaseAuth.currentUser.uid + "/" + id
  );

  ref.remove(err => {
    if (err) {
      console.log(err.message);
    } else {
      dispatch(deletePost(id));
    }
  });
};

const fbUpdatePost = (id, updates) => async dispatch => {
  const ref = firebaseDb.ref(
    "posts/" + firebaseAuth.currentUser.uid + "/" + id
  );

  ref.update(updates, err => {
    if (err) {
      console.log(err.message);
    } else {
      dispatch(updatePost(id, updates));
    }
  });
};

export {
  getPosts,
  logoutUser,
  loginUser,
  deletePost,
  updatePost,
  addPost,
  clearPosts,
  fbAddPost,
  fbDeletePost,
  fbUpdatePost
};
