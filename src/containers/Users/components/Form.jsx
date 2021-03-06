import React, { useEffect } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import validateMessages from 'config/validateMessages';

const ObjectForm = ({ currentObj, onClose, create, update, formErrors }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentObj != null) {
      form.setFieldsValue({ ...currentObj });
    } else {
      form.resetFields();
    }
  }, [currentObj]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    /**
     * Handler error from models.
     */
    if (formErrors) {
      const errorsData = [];
      const formValues = form.getFieldsValue();

      Object.keys(formErrors).forEach(key => {
        errorsData.push({
          name: key,
          errors: formErrors[key].map(errorMsg => errorMsg),
          value: formValues[key]
        });
      });
      form.setFields(errorsData);
    }
  }, [formErrors]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = values => {
    console.log('On finish ', values);
    if (currentObj) {
      update({...currentObj, ...values});
    } else {
      create(values);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{ is_active: false }}
      layout="vertical"
      className="card-block"
      name="objectForm"
      validateMessages={validateMessages}
    >
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input type="email" />
      </Form.Item>

      <Form.Item label="Nombre" name="first_name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Apellido" name="last_name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Nombre de usuario"
        name="username"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Activo" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item className="drawer-footer">
        <Button onClick={onClose} className="btn-forms-action">
          Cancelar
        </Button>
        <Button htmlType="submit" type="primary" className="btn-forms-action">
          {`${currentObj === null ? 'Crear' : 'Actualizar'}`}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ObjectForm;
