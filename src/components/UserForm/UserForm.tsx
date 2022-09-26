import React, {useState} from 'react';
import type { User } from '../../types/User';
import {Button, Form, Input, Select, Switch} from "antd";

interface Props {
  mode: 'edit' | 'create',
  data?: User,
  onSubmit: (info: User) => void;
  isLoading: boolean;
}

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 3, offset: 18 },
};

const { Option } = Select;

export const UserForm: React.FC<Props> = ({ mode, data = {}, onSubmit, isLoading}) => {
  const [name, setName] = useState<FieldData>({name: ['name'], value: data?.name});
  const [email, setEmail] = useState<FieldData>({ name: ['email'], value: data?.email });
  const [id] = useState<FieldData>({ name: ['id'], value: data?.id });
  const [gender, setGender] = useState<FieldData>({ name: ['gender'], value: data?.gender });
  const [status, setStatus] = useState<FieldData>({ name: ['status'], value: data?.status === 'active' });

  const onFinish = (values: any) => {
    onSubmit({
      name: values.name,
      email: values.email,
      id: data?.id || -1,
      gender: values.gender,
      status: values.status === true ? 'active' : 'inactive'
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(`UserForm.tsx:23:`, errorInfo);
  };

  const onUpdateField = (updated: FieldData[]) => {
    const [first] = updated;
    let cb = (newValue: FieldData) => {} // noop

    if (typeof first.name === 'object' && first.name.length) {
      const [fieldName] = first.name;

      switch (fieldName) {
        case "name": { cb = setName };
        break;
        case "email": { cb = setEmail};
        break;
        case "status": { cb = setStatus };
        break;
        case "gender": { cb = setGender };
        break;

        default: {}
      }

      cb(first);
    }
  };

  return (
    <div>
      <Form
        {...layout}
        name="userForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        fields={[name, email, id, gender, status]}
        onFieldsChange={onUpdateField}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={getBasicRules("name")}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={getBasicRules("email")}
        >
          <Input type="email"/>
        </Form.Item>

        { mode === 'edit' && (
          <Form.Item
            label="Id"
            name="id"
          >
            <Input readOnly/>
          </Form.Item>
        )}

        <Form.Item
          label="Gender"
          name="gender"
          hasFeedback
          rules={getBasicRules("gender")}
        >
          <Select>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>


        <Form.Item {...formTailLayout}>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            { mode === 'edit' ? 'Update User' : 'Create User' }
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

function getBasicRules(fieldName: string) {
  return [{
    required: true,
    message: `Please input your ${fieldName}`
  }];
}