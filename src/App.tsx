import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import { DetailUserPage } from './pages/DetailUserPage/DetailUserPage';
import { ListUsersPage} from './pages/ListUsersPage/ListUsersPage';
import './App.less';


function App() {
  const { Content, Header } = Layout;
  return (
    <Router>
      <Layout className="App">
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['userList']}
          >
            <Menu.Item key="userList">
              <Link to="">
                User Lists
              </Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Content  style={{padding: '50px'}}>
          <Routes>
            <Route path="/" element={<ListUsersPage/>}/>
            <Route path="/user-details/:id" element={<DetailUserPage/>}/>
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
