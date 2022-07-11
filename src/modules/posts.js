import * as postsAPI from '../api/posts';
import {
  createPromiseThunk,
  createPromiseThunkById,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from '../lib/asyncUtils';

// 하나의 API당 액션 3가지
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 상세 페이지 들어갈 때 이전에 봤던 상세 페이지 잔상이 남는 문제 해결을 위해
// 상세 페이지를 떠날 때 useEffect()의 cleanup 함수에서 상태를 null 처리하기 위함
const CLEAR_POST = 'CLEAR_POST';

// thunk creator function
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);

// 기존 구조는 post 상태를 객체 하나로 관리하기 때문에 CLEAR_POST 액션을 발생시키고 나면
// 이전 데이터를 재사용할 수가 없었음
//export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

export const clearPost = () => ({ type: CLEAR_POST });

const initialState = {
  posts: reducerUtils.initial(),
  post: {},
  //post: reducerUtils.initial(),
};

const postsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const postReducer = handleAsyncActionsById(GET_POST, 'post', true);
//const postReducer = handleAsyncActions(GET_POST, 'post');
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
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
      };
    default:
      return state;
  }
}
