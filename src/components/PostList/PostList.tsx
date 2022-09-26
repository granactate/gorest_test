import React, {useState} from 'react';
import { Result, Spin } from 'antd';
import { Post } from '../../types/Post';
import { PostItem } from './PostItem/PostItem';

import './PostList.less';

interface Props {
  posts?: Post[];
  isLoading: boolean;
}

export const PostList: React.FC<Props> = ({ posts, isLoading }) => {
  return (
    <div>
      {isLoading && <Spin />}
      {!isLoading && (!posts || !posts.length) && (
        <Result
          title="The user doesn't have posts registered"/>
      )}

      {!isLoading && !!posts && !!posts.length && (
        <div className="PostList_container_posts_list_container">
          <h3 className="text-center">User's post list</h3>
          {posts.map(post => <PostItem data={post} key={post.id}/>)}

        </div>
      )}
    </div>
  );
}