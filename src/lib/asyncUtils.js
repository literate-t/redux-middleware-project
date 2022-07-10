// type: GET_POST, GET_POSTS
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (param) => async (dispatch) => {
    dispatch({ type });
    try {
      dispatch({
        type: SUCCESS,
        payload: await promiseCreator(param),
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
      });
    }
  };
};

export const reducerUtils = {
  initial: (data = null) => ({
    data,
    loading: false,
    error: null,
  }),

  loading: (prevData = null) => ({
    data: prevData,
    loading: true,
    error: null,
  }),

  success: (data) => ({
    data,
    loading: false,
    error: null,
  }),

  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};
