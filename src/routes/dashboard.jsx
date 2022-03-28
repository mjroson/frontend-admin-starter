import DashboardPage from 'containers/Dashboard/DashboardPage';
import UserPage from 'containers/Users/Main';
import {
  DashboardOutlined,
  UserOutlined,
  BankOutlined,
  RightCircleOutlined
} from '@ant-design/icons';

const dashboardRoutes = [
  {
    path: '/dashboard',
    label: 'Index',
    Icon: DashboardOutlined,
    component: DashboardPage
  },
  {
    path: '/users',
    label: 'Users',
    Icon: UserOutlined,
    component: UserPage
  },
  {
    path: '/page-from-header',
    label: 'Menu on header',
    Icon: RightCircleOutlined,
    to: '/dashboard',
    redirect: true,
    header: true
  },
  {
    label: 'Submenu Example',
    Icon: BankOutlined,
    path: "/dashboard",
    submenu: [
      {
        label: 'Item 1',
        Icon: RightCircleOutlined,
        path: '/item1',
        to: '/dashboard',
        redirect: true,
      },
      {
        label: 'Item 2',
        Icon: RightCircleOutlined,
        path: '/item2',
        to: '/dashboard',
        redirect: true,
      }
    ]
  },
  {
    redirect: true,
    path: '/',
    to: '/dashboard',
    hidden: true
  }
];

export default dashboardRoutes;
