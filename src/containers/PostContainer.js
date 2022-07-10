import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post';
import { clearPost, getPost } from '../modules/posts';

function PostContainer({ postId }) {
  const { data, loading, error } = useSelector((state) => state.posts.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(postId));

    // cleanup
    // unmount되거나 혹은 만약 postId가 바뀌어서 effect 함수가 호출되기 직전에 호출
    // 이 방법의 문제는 클릭한 포스트가 캐싱이 안 된다는
    // 이걸 개선하려면 구조를 바꿔야 함
    return () => {
      dispatch(clearPost());
    };
  }, [postId, dispatch]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return null;

  console.log('<data>', data);
  return <Post post={data} />;
}

export default PostContainer;
