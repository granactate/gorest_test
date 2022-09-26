import React, {useState} from 'react';
import { Modal } from 'antd';
import { UserForm } from '../../UserForm/UserForm';
import { User } from '../../../types/User';
import {useCreateUserMutation} from "../../../services/users";

interface Props {
  showModal: boolean;
  onCloseModal: (wasCreated: boolean) => void;
}

export const CreateUserModal: React.FC<Props> = ({ showModal, onCloseModal  }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [createUser] = useCreateUserMutation();

  const onSubmit = async  (newUser: User) => {
    try {
      setConfirmLoading(true)
      const response = await createUser(newUser).unwrap();
      if (response && response.id){
        setConfirmLoading(false);
        onCloseModal(true);
      }
    } catch(err: any) {
      setConfirmLoading(false);
      alert('there was an error at the creation moment please try again.');
      onCloseModal(false);
    }
  };

  return (
    <Modal
      title={`Creating a new user`}
      open={showModal}
      confirmLoading={confirmLoading}
      footer={null}
      onCancel={() => onCloseModal(false)}
    >
      <UserForm mode="create" onSubmit={onSubmit} isLoading={confirmLoading}/>
    </Modal>
  )
};