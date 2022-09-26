import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row} from 'antd';
import { TodoList } from '../../components/TodoList/TodoList';
import { useGetPostsUserQuery, useGetTodosUserQuery } from '../../services/users';
import { selectUserPicked } from '../../store/userSlice';
import { PostList } from '../../components/PostList/PostList';

export const DetailUserPage: React.FC = () => {
  const params = useParams();
  const pickedUser = useSelector(selectUserPicked) || { id: Number(params.id)};
  const [todosPage, setTodosPage] = useState(1);
  const [postsPage, setPostsPage] = useState(1);

  const paramsQueryTodos = { page: todosPage, id: pickedUser.id };
  const paramsQueryPosts = { page: postsPage, id: pickedUser.id };
  const { isLoading: isLoadingTodos, data: todosData } = useGetTodosUserQuery(paramsQueryTodos);
  const { isLoading: isLoadingPosts, data: postsData } = useGetPostsUserQuery(paramsQueryPosts);


  return (
    <Row>
      <Col span={6}>
        <TodoList todos={todosData?.list} isLoading={ isLoadingTodos } />
      </Col>

      <Col span={18}>
        <PostList posts={postsData?.list} isLoading={ isLoadingPosts }/>
      </Col>
    </Row>
  )
}