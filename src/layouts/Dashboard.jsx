import React, { useState, useMemo } from "react";
import { Layout, Button, BackTop, Menu } from "antd";
import {
  ProfileOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import dashboardRoutes from "routes/dashboard";

import Logo from "layouts/components/Logo";
import menuMaker from "layouts/components/Menu";
import Notifications from "layouts//components/Notifications";
import SidebarMenu from "layouts/components/SidebarMenu";

import "./index.less";

const { SubMenu } = Menu;

const { REACT_APP_TOGGLE_MOBILE_WIDTH, REACT_APP_TOGGLE_TABLET_WIDTH } =
  process.env;

const { Content, Footer, Sider, Header } = Layout;

const switchRoutes = (routes, parentKey = "") =>
  routes.map((item, idx) => {
    const key = parentKey ? `${parentKey}-${idx}` : String(idx);
    if (item.redirect) {
      if (item.external) {
        return (
          <Route
            path={item.path}
            element={() => {
              window.location.replace(item.to);
              return <p>Redirect...</p>;
            }}
            key={key}
          />
        );
      }
      return (
        <Route
          path={item.path}
          key={key}
          element={<Navigate to={item.to} replace />}
        />
      );
    }

    if (item.submenu) return switchRoutes(item.submenu, key);

    return <Route path={item.path} element={<item.component />} key={key} />;
  });

const Dashboard = ({ history }) => {
  const navigate = useNavigate();

  // const userData = useSelector(state => state.user.detail ?? {});

  const [sidebarCollapse, setSidebarCollapse] = useState(false);

  // const [theme, setTheme] = useState('dark');

  const [ui, setUI] = useState({
    marginContent: "16px 16px 0px 0px",
    collapsedWidth: 200,
    showButtonCollapse: false,
    type: "desktop",
  });

  const checkSidebarCollapse = () => {
    if (window.innerWidth < REACT_APP_TOGGLE_MOBILE_WIDTH && !sidebarCollapse) {
      setSidebarCollapse(true);
    } else if (
      window.innerWidth < REACT_APP_TOGGLE_TABLET_WIDTH &&
      !sidebarCollapse
    ) {
      setSidebarCollapse(true);
    }
  };

  const initialDefineUI = () => {
    if (window.innerWidth < REACT_APP_TOGGLE_MOBILE_WIDTH) {
      setUI({
        ...ui,
        marginContent: "0px",
        collapsedWidth: 0,
        showButtonCollapse: true,
        type: "mobile",
      });
    } else if (window.innerWidth < REACT_APP_TOGGLE_TABLET_WIDTH) {
      setUI({
        marginContent: "16px 16px 0px 0px",
        collapsedWidth: 80,
        showButtonCollapse: false,
        type: "tablet",
      });
    }
  };

  useMemo(() => initialDefineUI(), []); // eslint-disable-line react-hooks/exhaustive-deps
  useMemo(() => checkSidebarCollapse(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const onLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refresh_token");
    navigate("/login", { replace: true });
  };

  const onClickMenuItem = (item, index, selectedKeys) => {
    navigate(item.item.props.path);
  };

  const onClickSidebar = (item, index, selectedKeys) => {
    onClickMenuItem(item, index, selectedKeys);
    checkSidebarCollapse();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={sidebarCollapse}
        collapsedWidth={ui.collapsedWidth}
        // theme={theme}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        className="sidebar-main"
      >
        <div id="logo">
          <Logo /> <spam className="text" >ADMIN</spam>
        </div>
        {/* <AntSwitch
          checked={theme === 'dark'}
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        /> */}
        <SidebarMenu
          onClickMenuItem={onClickSidebar}
          theme="dark"
          // theme={theme}
          routes={dashboardRoutes}
        />
      </Sider>

      <Layout>
        <Header className="header-main">
          {/* Button for collapse sidebar */}
          {ui.showButtonCollapse && (
            <Button
              type={sidebarCollapse ? "primary" : "secondary"}
              size="large"
              icon={<MenuOutlined />}
              onClick={() => setSidebarCollapse(!sidebarCollapse)}
            />
          )}
          {/* Menu on header */}
          <Menu
            mode="horizontal"
            className="header-menu"
            onSelect={onClickMenuItem}
          >
            {menuMaker(dashboardRoutes, null, "header")}
          </Menu>

          <Notifications deviceType={ui.type} />

          {/* Menu to manager custom user */}
          <Menu mode="horizontal">
            <SubMenu
              key="SubMenuUser"
              placement="bottomLeft"
              icon={<UserOutlined />}
            >
              <Menu.Item key="2" icon={<ProfileOutlined size="large" />}>
                Profile
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                key="3"
                onClick={onLogout}
                icon={<LogoutOutlined size="large" />}
              >
                Logout
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Header>

        <Content className="content-main">
          <Routes>{switchRoutes(dashboardRoutes)}</Routes>
        </Content>
        <Footer style={{ textAlign: "center", minHeight: "50px", background: "rgb(238 238 238)" }}>
          Boilerplate Reactjs, redux and ant design @2022
        </Footer>
      </Layout>
      <BackTop />
    </Layout>
  );
};

export default Dashboard;
