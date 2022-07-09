const INCREASE = 'modules/INCREASE';
const DECREASE = 'modules/DECREASE';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// thunk function creator
// (dispatch, getState)를 인자로 받는 함수가 thunk function
export const increaseAsync = () => (dispatch /*, getState */) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

export const decreaseAsync = () => (dispatch /*, getState */) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

const initialState = 0;

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
