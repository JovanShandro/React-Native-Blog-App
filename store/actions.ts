import { firebaseDb, firebaseAuth } from "../lib/firebase";
import { Action } from "redux";
import {
  Post,
  PostCreateAction,
  PostDeleteAction,
  PostUpdateAction,
  PostThunk
} from "../lib/types";

//Posts
export const updatePost = (
  id: string,
  updates: Partial<Post>
): PostUpdateAction => ({
  type: "UPDATE",
  id,
  updates
});

export const deletePost = (id: string): PostDeleteAction => ({
  type: "DELETE",
  id
});

export const addPost = (id: string, post: Post): PostCreateAction => ({
  type: "ADD",
  id,
  post
});

export const clearPosts = (): Action => ({
  type: "CLEAR_POSTS"
});

//Auth
export const loginUser = (): Action => ({
  type: "LOGIN"
});

export const logoutUser = (): Action => ({
  type: "LOGOUT"
});

export const firebaseEvents = (): PostThunk => async dispatch => {
  const ref = await firebaseDb.ref("posts/" + firebaseAuth.currentUser!.uid);
  ref.on("child_added", snapshot => {
    const post = snapshot.val();
    const id = snapshot.key!;
    dispatch(addPost(id, post));
  });

  ref.on("child_changed", snapshot => {
    const post = snapshot.val();
    const id = snapshot.key!;
    dispatch(updatePost(id, post));
  });

  ref.on("child_removed", snapshot => {
    const id = snapshot.key!;
    dispatch(deletePost(id));
  });
};

export const fbAddPost = (data: Post): PostThunk => async () => {
  // call twice to make almost sure not same id generated twice
  const randomId =
    Math.random()
      .toString()
      .split(".")[1] +
    Math.random()
      .toString()
      .split(".")[1];

  const ref = firebaseDb.ref(
    "posts/" + firebaseAuth.currentUser!.uid + "/" + randomId
  );

  try {
    await ref.set(data);
  } catch (e) {
    /* handle error */
    console.log(e.message);
  }
};

export const fbDeletePost = (id: number): PostThunk => async () => {
  const ref = firebaseDb.ref(
    "posts/" + firebaseAuth.currentUser!.uid + "/" + id
  );

  try {
    await ref.remove();
  } catch (e) {
    /* handle error */
    console.log(e.message);
  }
};

export const fbUpdatePost = (
  id: number,
  updates: Partial<Post>
): PostThunk => async () => {
  const ref = firebaseDb.ref(
    "posts/" + firebaseAuth.currentUser!.uid + "/" + id
  );

  try {
    await ref.update(updates);
  } catch (e) {
    /* handle error */
    console.log(e.message);
  }
};
