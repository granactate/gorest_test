import React, {useState} from 'react';
import { Button, Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { useDispatch } from 'react-redux';
import { UserSearch } from '../../components/UserSearch/UserSearch';
import { UserList } from '../../components/UserList/UserList';
import { CreateUserModal } from '../../components/modals/CreateUserModal/CreateUserModal';
import { sendOutdatedSignal } from '../../store/userSlice';

export const ListUsersPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const onCloseModal = (wasCreated: boolean) => {
    setShowModal(false);

    if(wasCreated) {
      dispatch(sendOutdatedSignal(Date.now()))
    }
  };

  return (
    <>
      <Row style={{paddingBottom : '12px'}}>
        <Col span={21}>
          <UserSearch />
        </Col>
        <Col span={3}>
          <Button
            type="primary"
            style={{height: '100%', width: '100%'}}
            icon={<FontAwesomeIcon icon={faSquarePlus}/>}
            size="large"
            onClick={() => setShowModal(true)}
          >
            Create user
          </Button>
        </Col>
      </Row>

      <UserList />
      <CreateUserModal showModal={showModal} onCloseModal={onCloseModal}/>
    </>
  );
}