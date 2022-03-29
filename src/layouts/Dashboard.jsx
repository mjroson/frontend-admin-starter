import React, { useState, useMemo } from 'react';
import { Layout, Button, BackTop } from 'antd';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './index.less';
import { MenuOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import Logo from 'components/icons/Logo';
import dashboardRoutes from 'routes/dashboard';
import Notifications from './components/Notifications';

import SidebarMenu from './components/SidebarMenu';
import HeaderMenu from './components/HeaderMenu';

const {
  REACT_APP_TOGGLE_MOBILE_WIDTH,
  REACT_APP_TOGGLE_TABLET_WIDTH
} = process.env;

const { Content, Footer, Sider, Header } = Layout;

const switchRoutes = (routes, parentKey = '') =>
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
      return <Route
              path={item.path} key={key}
              element={<Navigate to={item.to} replace />}
            />;
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
    marginContent: '16px 16px 0px 0px',
    collapsedWidth: 200,
    showButtonCollapse: false,
    type: 'desktop'
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
        marginContent: '0px',
        collapsedWidth: 0,
        showButtonCollapse: true,
        type: 'mobile'
      });
    } else if (window.innerWidth < REACT_APP_TOGGLE_TABLET_WIDTH) {
      setUI({
        marginContent: '16px 16px 0px 0px',
        collapsedWidth: 80,
        showButtonCollapse: false,
        type: 'tablet'
      });
    }
  };

  useMemo(() => initialDefineUI(), []); // eslint-disable-line react-hooks/exhaustive-deps
  useMemo(() => checkSidebarCollapse(), []); // eslint-disable-line react-hooks/exhaustive-deps


  const onLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('refresh_token');
    navigate('/login', { replace: true });
  };

  const onClickMenuItem = (item, index, selectedKeys) => {
    navigate(item.item.props.path);
  };

  const onClickSidebar = (item, index, selectedKeys) => {
    onClickMenuItem(item, index, selectedKeys)
    checkSidebarCollapse();
  }

  return (
    <Layout>
      <Sider
        collapsed={sidebarCollapse}
        collapsedWidth={ui.collapsedWidth}
        // theme={theme}
        onBreakpoint={broken => {
          console.log(broken);
        }}
        className="sidebar-main"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 9,
          overflowX: 'hidden'
        }}
      >
        <div id="logo">
          <Logo style={{ width: '95%' }} />
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
      <Layout
        style={{
          marginLeft: `${ui.collapsedWidth}px`,
          width: `calc(100% - ${ui.collapsedWidth}px)`,
          minHeight: '100vh'
        }}
      >
        <Header
          style={{ width: '100%' }}
          className="site-layout-sub-header-background"
        >
          <HeaderMenu
            onLogout={onLogout}
            onClickMenuItem={onClickMenuItem}
            routes={dashboardRoutes}
          />
          <div style={{ float: 'right', marginRight: '5px' }}>
            <Notifications />
          </div>
        </Header>
        <Content
          style={{
            margin: ui.marginContent,
            minHeight: 'calc(100% - 220px)'
          }}
        >
          <Routes>{switchRoutes(dashboardRoutes)}</Routes>
        </Content>
        {ui.showButtonCollapse && (
          <Button
            type="primary"
            size="large"
            style={{ position: 'fixed', bottom: '12px', left: '0px' }}
            icon={<MenuOutlined />}
            onClick={() => setSidebarCollapse(false)}
          />
        )}
        <Footer style={{ textAlign: 'center', height: '50px' }}>
          Boilerplate Reactjs, redux and ant design @2022
        </Footer>
        <BackTop />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
