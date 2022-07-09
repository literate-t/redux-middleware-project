import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increaseAsync, decreaseAsync } from '../modules/counter';

function CounterContainer() {
  const number = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  // *Async() 함수는 thunk function을 반환
  // redux-thunk 미들웨어를 등록했으므로
  // action === 'function'일 경우
  // action(store.dispatch, store.getState)
  const onIncrease = () => dispatch(increaseAsync());
  const onDecrease = () => dispatch(decreaseAsync());

  // const onIncrease = () => dispatch(increase());
  // const onDecrease = () => dispatch(decrease());

  return (
    <Counter number={number} onDecrease={onDecrease} onIncrease={onIncrease} />
  );
}

export default CounterContainer;
