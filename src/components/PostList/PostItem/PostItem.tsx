import React, { useState } from 'react';
import { Card, Divider } from 'antd';
import { CommentItem } from "../CommentItem/CommentItem";
import { useGetCommentByPostUserQuery } from '../../../services/users';
import type { Post } from '../../../types/Post';

import './PostItem.less';

interface Props {
  data: Post
}

export const PostItem: React.FC<Props> = ({ data }) => {
  const [page, setPage] = useState(1);

  const { data: commentsData } = useGetCommentByPostUserQuery({page, id: data.id })

  console.log(`PostItem.tsx:22:`, commentsData);
  return (
    <div className="PostItem_container">
      <Card>
        <h3>{data.title}</h3>

        <p>{data.body}</p>

        { !!commentsData && commentsData.list && !!commentsData.list.length && (
          <>
            <Divider />

            {commentsData.list.map(comment => <CommentItem data={comment} key={comment.id}/>)}
          </>
        )}
      </Card>


    </div>
  )
}