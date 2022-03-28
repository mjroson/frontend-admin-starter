import React from 'react';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ history }) => {

  const navigate = useNavigate()

  const redirect = () => {
    const query = new URLSearchParams(window.location.search);
    const next = query.get('next');
    if (
      next &&
      next !== null &&
      next !== '' &&
      window.location.pathname !== next
    ) {
      navigate(next);
    } else {
      navigate('/');
    }
  };


  const onFinish = (values) => {
    axios
      .post('/api/auth/token/', values)
      .then(resp => {
        message.success(`Bienvenido ${values.username}`);
        window.localStorage.setItem('token', resp.data.access);
        window.localStorage.setItem('refresh_token', resp.data.refresh);
        redirect();
      })
      .catch(e => {
        if (
          e.response &&
          e.response.status === 400 &&
          e.response.data &&
          e.response.data.non_field_errors
        ) {
          message.error(e.response.data.non_field_errors[0]);
        }
      });
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      className="section-auth"
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}
    >
      <Card title="Iniciar sesion" style={{ maxWidth: 400 }}>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="login-form"
          name="loginForm"
        >
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input
              prefix={
                <MailOutlined />
              }
              placeholder="Nombre de usuario"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} label="Password">
            <Input.Password
              prefix={
                <LockOutlined />
              }
              placeholder="Password"
              
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked"  wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remermber me</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
