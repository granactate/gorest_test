import React, {useState} from 'react';
import { Modal } from 'antd';
import { UserForm } from '../../UserForm/UserForm';
import { User } from '../../../types/User';
import {useUpdateUserMutation} from "../../../services/users";

interface Props {
  showModal: boolean;
  onCloseModal: (wasUpdated: boolean) => void;
  user: User;
}

export const UpdateUserModal: React.FC<Props> = ({ showModal, onCloseModal, user }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (updatedUser: User) => {
    try {
      setConfirmLoading(true)
      await updateUser(updatedUser).unwrap()
      setConfirmLoading(false);
      onCloseModal(true);
    }catch (err: any) {
      setConfirmLoading(false);
      alert('There was a problem updating the user');
      onCloseModal(false);
    }
  }

  return (
    <Modal
      title={`Updating a new user`}
      open={showModal}
      confirmLoading={confirmLoading}
      footer={null}
      onCancel={() => onCloseModal(false)}
    >
      <UserForm mode="edit" onSubmit={onSubmit} isLoading={confirmLoading} data={user}/>
    </Modal>
  )
}