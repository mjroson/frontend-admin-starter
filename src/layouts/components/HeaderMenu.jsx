import React from 'react';
import { Menu } from 'antd';
import {
  ProfileOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';

import menuMaker from './Menu';

const { SubMenu } = Menu;

const HeaderMenu = ({ onClickMenuItem, onLogout, routes }) => (
  <>
  {/* Menu to manager custom user */}
  <Menu mode="horizontal" style={{ float: 'right' }}>
    <SubMenu key="SubMenuUser" placement="bottomLeft" icon={<UserOutlined />}>
      <Menu.Item key="2" icon={ <ProfileOutlined size="large" />}>
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={onLogout} icon={<LogoutOutlined size="large" />}>
        Logout
      </Menu.Item>
    </SubMenu>
  </Menu>

  {/* Menu on header */}
  <Menu mode="horizontal" style={{ float: 'right' }} onSelect={onClickMenuItem}>
    {menuMaker(routes, null, 'header')}
  </Menu>
  </>
);

export default HeaderMenu;
