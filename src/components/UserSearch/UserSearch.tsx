import React, {useEffect, useState} from 'react';
import { Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { useDebounceValue } from '../../hooks/useDebounceValue';
import {setSearchText} from "../../store/userSlice";


export const UserSearch: React.FC = () => {
  const [text, setText] = useState('');
  const { value } = useDebounceValue<string>(text,'',  500);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchText(value))
  }, [value])

  return (
    <div>
      <Input
        allowClear
        size="large"
        value={text}
        placeholder="Search by user's name"
        prefix={<FontAwesomeIcon icon={faUser}/>}
        onChange={(evt) =>  setText(evt.target.value)}
      />
    </div>
  )
}