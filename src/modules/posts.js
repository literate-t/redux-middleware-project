import * as postsAPI from '../api/posts';

// 하나의 API당 액션 3가지
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// thunk creator function
export const getPosts = () => async (dispatch) => {
  // 요청 시작
  dispatch({ type: GET_POSTS });
  // API 호출
  try {
    const posts = await postsAPI.getPosts();
    // 성공
    dispatch({
      type: GET_POSTS_SUCCESS,
      posts,
    });
  } catch (error) {
    // 실패
    dispatch({
      type: GET_POSTS_ERROR,
      error,
    });
  }
};

// thunk creator function
export const getPost = (id) => async (dispatch) => {
  // 요청 시작
  dispatch({ type: GET_POST });
  // API 호출
  try {
    const post = await postsAPI.getPostsById(id);
    // 성공
    dispatch({
      type: GET_POST_SUCCESS,
      post,
    });
  } catch (error) {
    // 실패
    dispatch({
      type: GET_POST_ERROR,
      error,
    });
  }
};
