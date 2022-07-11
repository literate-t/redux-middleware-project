import {
  delay,
  put,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects';

const INCREASE = 'modules/INCREASE';
const DECREASE = 'modules/DECREASE';
const INCREASE_ASYNC = 'modules/INCREASE_ASYNC';
const DECREASE_ASYNC = 'modules/DECREASE_ASYNC';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

// action을 모니터 하는 함수
// 내보내서 root saga 만들어야 함
export function* counterSaga() {
  // INCREASE_ASYNC를 디스패치하면 increaseSaga 호출
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  // 마지막에 들어오는 DECREASE_ASYNC만 처리
  //yield takeLatest(DECREASE_ASYNC, decreaseSaga);
  // 처음에 들어오는 것만 처리
  // 처리하는 동안 다른 액션은 처리 안 됨
  yield takeLeading(DECREASE_ASYNC, decreaseSaga);
}

// thunk function creator
// (dispatch, getState)를 인자로 받는 함수가 thunk function
// export const increaseAsync = () => (dispatch /*, getState */) => {
//   setTimeout(() => {
//     dispatch(increase());
//   }, 1000);
// };

// export const decreaseAsync = () => (dispatch /*, getState */) => {
//   setTimeout(() => {
//     dispatch(decrease());
//   }, 1000);
// };

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
