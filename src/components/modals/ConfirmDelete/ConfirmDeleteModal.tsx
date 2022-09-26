import React, {useState} from 'react';
import { Modal } from 'antd';
import { User } from '../../../types/User';
import { useDeleteUserMutation } from '../../../services/users';

interface Props {
  user: User;
  showModal: boolean;
  onClickCancel: (wasDeleted?: boolean) => void;
}

export const ConfirmDeleteModal: React.FC<Props> = ({
  user,
  showModal,
  onClickCancel
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deleteUser] = useDeleteUserMutation();

  const onClickOk = async () => {
    setConfirmLoading(true);
    try {
      await deleteUser(user.id).unwrap();
      setConfirmLoading(false);
      onClickCancel(true);
    } catch (err: any) {
      const message = err?.data?.message || 'There was an error at the deleting moment';
      setConfirmLoading(false)
      onClickCancel();
      alert(message);
    }
  };

  return (
    <Modal
      title={`Deleting ${user.name}`}
      open={showModal}
      onOk={onClickOk}
      confirmLoading={confirmLoading}
      onCancel={() => onClickCancel()}
      okButtonProps={{
        type: "primary",
        danger: true,
      }}
      okText="Delete"
    >
      <p>
        Are you sure of deleting the user with the name "<i>{user.name}</i>" with the id(<b>{user.id}</b>)
      </p>
    </Modal>
  );
}