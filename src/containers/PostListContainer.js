import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../components/PostList';
import { getPosts } from '../modules/posts';

function PostListContainer() {
  const { data, loading, error } = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    //if (data) return; 데이터가 바뀌어도 렌더링이 안 됨
    dispatch(getPosts());
  }, [dispatch]); // depth에 dispatch를 넣으나 안 넣으나 똑같음. 다만 eslint 규칙을 준수하기 위해

  if (loading && !data) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <PostList posts={data} />;
}

export default PostListContainer;
