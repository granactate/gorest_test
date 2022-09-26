import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { pickUser } from '../../store/userSlice';
import { User } from '../../types/User';
import { ConfirmDeleteModal } from '../modals/ConfirmDelete/ConfirmDeleteModal';
import { useNavigate } from 'react-router-dom';
import { UpdateUserModal } from '../modals/UpdateUserModal/UpdateUserModal';

import './TableActionOptions.less';

interface Props {
  record: User,
  onChangeList: () => void;
}

export const TableActionOptions: React.FC<Props> = ({ record, onChangeList }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickCancelDelete = (wasDeleted?: boolean) => {
    setShowDelete(false);

    if (wasDeleted) {
      onChangeList();
    }
  };

  const onCloseUpdateModal = (wasUpdated: boolean) => {
    setShowUpdate(false);
    if (wasUpdated) {
      onChangeList();
    }
  };

  const onClickDeleteButton = () => {
    dispatch(pickUser(record));
    setShowDelete(true);
  };

  const onClickUpdateButton = () => {
    dispatch(pickUser(record));
    setShowUpdate(true);
  }

  const onClickViewDetailsButtons = () => {
    dispatch(pickUser(record));
    navigate(`/user-details/${record.id}`);
  };

  return (
    <div className="TableActionOptions_container">
      <Tooltip placement="topLeft" title="See user details">
        <Button type="primary" shape="circle" onClick={onClickViewDetailsButtons}>
          <FontAwesomeIcon icon={faEye}/>
        </Button>
      </Tooltip>

      <Tooltip placement="topLeft" title="Edit user">
        <Button type="dashed"  shape="circle" onClick={onClickUpdateButton}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </Tooltip>

      <Tooltip placement="topLeft" title="Delete user">
        <Button type="dashed" danger  shape="circle" onClick={onClickDeleteButton}>
          <FontAwesomeIcon icon={faTrashCan}/>
        </Button>
      </Tooltip>

      <ConfirmDeleteModal user={record} showModal={showDelete} onClickCancel={onClickCancelDelete}/>
      <UpdateUserModal  user={record} showModal={showUpdate} onCloseModal={onCloseUpdateModal}/>
    </div>
  )
}