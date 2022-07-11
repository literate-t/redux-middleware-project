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

const defaultIdSelector = (param) => param;
export const createPromiseThunkById = (
  type,
  promiseFn,
  idSelector = defaultIdSelector // id만 받을 때는 없어도 되지만 나중에 {id, option} 식으로 받게 되면 idSelector 필요
) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (param) => async (dispatch) => {
    const id = idSelector(param);
    dispatch({ type, meta: id });
    try {
      dispatch({
        type: SUCCESS,
        payload: await promiseFn(param),
        meta: id,
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
        meta: id,
      });
    }
  };
};

export const handleAsyncActions = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};

export const handleAsyncActionsById = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (state, action) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(keepData ? state[key][id]?.data : null),
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload),
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload),
          },
        };
      default:
        return state;
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
