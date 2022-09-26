import React from 'react';
import { Card, Col, Result, Row, Spin, Typography } from "antd";
import dayjs from 'dayjs';
import advancedFormat  from 'dayjs/plugin/advancedFormat';
import { Todo } from '../../types/Todo';

import './TodoList.less';

dayjs.extend(advancedFormat)

interface Props {
  todos?: Todo[];
  isLoading: boolean;
}

export const TodoList: React.FC<Props> = ({ todos , isLoading}) => {
  let sortedTodos: Todo[] = [];
  const { Text } = Typography;

  if (todos && todos.length) {
    const completed =  todos.filter(todo => todo.status === 'completed');
    const uncompleted =  todos.filter(todo => todo.status !== 'completed');
    sortedTodos = [...uncompleted].sort(sortByDueOn);
    sortedTodos = sortedTodos.concat(completed.sort(sortByDueOn))
  }

  return (
    <div>
      {isLoading && <Spin />}
      {!isLoading && (!todos || !todos.length) && (
        <Result
          title="The user doesn't have todos registered"/>
      )}
      {!isLoading && !!todos && !!todos.length && (
        <div className="TodoList_container_todo_list_container">
          <h3 className="text-center">User's todo list</h3>
          <Row>
            {sortedTodos.map((todo, index) =>  (
              <Col className="gutter-row TodoList_container_col" span={24} key={todo.id} order={index}>
                <Card>
                  <>
                    <div className="TodoList_container_card_title">{todo.title}</div>

                    <Text type={todo.status === 'completed' ? "success" :  "secondary"}>{todo.status} </Text>
                    <p className="TodoList_container_due_on">
                      <b>Due on:</b>  {dayjs(todo.due_on).format('dddd Do MMMM YYYY')}
                    </p>
                  </>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  )
};


function sortByDueOn(todo: Todo, todo2: Todo) {
  const date1 = dayjs(todo.due_on);
  const date2 = dayjs(todo2.due_on);

  return date1.diff(date2,  'ms')
}