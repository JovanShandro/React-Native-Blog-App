import { firebaseDb, firebaseAuth } from "../lib/firebase";

//Posts
export const updatePost = (id, updates) => {
  return {
    type: "UPDATE",
    id,
    updates
  };
};

export const deletePost = id => {
  return {
    type: "DELETE",
    id
  };
};

export const addPost = (id, post) => {
  return {
    type: "ADD",
    id,
    post
  };
};

export const clearPosts = () => {
  return {
    type: "CLEAR_POSTS"
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

export const firebaseEvents = () => async dispatch => {
  const ref = await firebaseDb.ref("posts/" + firebaseAuth.currentUser.uid);
  ref.on("child_added", snapshot => {
    const post = snapshot.val();
    const id = snapshot.key;
    dispatch(addPost(id, post));
  });

  ref.on("child_changed", snapshot => {
    const post = snapshot.val();
    const id = snapshot.key;
    dispatch(updatePost(id, post));
  });

  ref.on("child_removed", snapshot => {
    const id = snapshot.key;
    dispatch(deletePost(id));
  });
};

export const fbAddPost = data => async () => {
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

  try {
    await ref.set(data);
  } catch (e) {
    /* handle error */
    console.log(e.message);
  }
};

export const fbDeletePost = id => async () => {
  const ref = firebaseDb.ref(
    "posts/" + firebaseAuth.currentUser.uid + "/" + id
  );

  try {
    await ref.remove();
  } catch (e) {
    /* handle error */
    console.log(e.message);
  }
};

export const fbUpdatePost = (id, updates) => async () => {
  const ref = firebaseDb.ref(
    "posts/" + firebaseAuth.currentUser.uid + "/" + id
  );

  try {
    await ref.update(updates);
  } catch (e) {
    /* handle error */
    console.log(e.message);
  }
};
