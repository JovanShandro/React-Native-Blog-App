import { ThunkAction } from "redux-thunk";

// Redux state
export interface AuthState {
  isLoggedIn: boolean;
}

export interface PostsState {
  [key: number]: Post;
}

export interface Post {
  date: number;
  description: string;
  image: string;
  title: string;
}

export interface RootState {
  auth: AuthState;
  posts: PostsState;
}

// Actions
export type PostCreateAction = {
  post: Post;
} & PostDeleteAction;

export type PostUpdateAction = {
  updates: Partial<Post>;
} & PostDeleteAction;

export type PostDeleteAction = {
  type: string;
  id: string;
};

export type PostAction = PostDeleteAction | PostUpdateAction | PostCreateAction;

//Action Creators
export type PostThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  PostAction
>;
