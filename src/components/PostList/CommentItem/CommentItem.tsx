import React from 'react';
import {Avatar, Card, Col, Row} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import type { UserComment } from '../../../types/UserComment';

import './CommentItem.less';

interface Props {
  data: UserComment
}

export const CommentItem: React.FC<Props> = ({ data }) => {
  return (
    <Row>
      <Col span={9} offset={15}>
        <div className="CommentItem_container">
          <Card style={{borderRadius: '8px'}} className="CommentItem_card">
            <div  className="CommentItem_card_content">
              <div className="CommentItem_card_icon">
                <Avatar icon={<FontAwesomeIcon icon={faUser}/>} />
              </div>
              <div className="CommentItem_card_contact_info">
                <div className="CommentItem_card_email">{data.email}</div>
                <div className="CommentItem_card_name">{data.name}</div>
              </div>
              <div className="CommentItem_card_body">{data.body}</div>
            </div>
          </Card>
        </div>
      </Col>
    </Row>

  )
};