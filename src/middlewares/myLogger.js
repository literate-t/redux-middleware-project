const myLogger = (store) => (next) => (action) => {
  console.log(action);
  // 액션을 다음 미들웨어에게 전달
  // or 액션이 없으면 리듀서에게 전달
  const result = next(action);

  // dispatch 이후의 상태(변화 적용 이후)
  // console.log('\tNext', store.getState());

  return result; // useDispatch()로 사용하는 클로저인 dispatch의 리턴값이 된다
};

export default myLogger;
