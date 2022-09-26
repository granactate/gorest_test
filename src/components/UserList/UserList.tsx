import React, {useEffect, useState} from 'react';
import { Table, TablePaginationConfig } from 'antd';
import { useUsersPagination } from '../../hooks/useUsersPagination';
import { User } from '../../types/User';
import { TableActionOptions } from '../TableActionOptions/TableActionOptions';


export const UserList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { users, paginationInfo, isLoading, forceRender } = useUsersPagination({ page, setPage });

  const paginationOption: TablePaginationConfig = {
    ...paginationInfo,
    onChange: setPage,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  };

  function getColumns() {
    return [
      { title: 'ID', dataIndex: 'id', key: 'id'},
      { title: 'Name', dataIndex: 'name', key: 'name'},
      { title: 'Email', dataIndex: 'email', key: 'email'},
      { title: 'Gender', dataIndex: 'gender', key: 'gender'},
      {
        title: 'Action',
        key: 'action',
        render: (record: User) => <TableActionOptions record={record} onChangeList={forceRender}/>,
        width: 200
      }
    ]
  }

  return (
    <div>
      <Table
        dataSource={users}
        columns={getColumns()}
        pagination={paginationOption}
        bordered
        rowKey="id"
        loading={isLoading}
      />
    </div>
  )
}


