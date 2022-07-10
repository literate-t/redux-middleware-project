import * as postsAPI from '../api/posts';
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
} from '../lib/asyncUtils';

// 하나의 API당 액션 3가지
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// thunk creator function
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);

// thunk creator function
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

const postsReducer = handleAsyncActions(GET_POSTS, 'posts');
const postReducer = handleAsyncActions(GET_POST, 'post');
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return postsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return postReducer(state, action);
    default:
      return state;
  }
}
