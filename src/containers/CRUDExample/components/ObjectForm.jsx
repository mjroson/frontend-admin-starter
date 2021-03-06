import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
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

  const onFinish = data => {
    if (currentObj) {
      update({ ...currentObj, ...data });
    } else {
      create(data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      className="card-block"
      name="objectForm"
      validateMessages={validateMessages}
    >
      <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <div className="drawer-footer">
        <Button onClick={onClose} className="btn-forms-action">
          Cancelar
        </Button>
        <Button htmlType="submit" type="primary" className="btn-forms-action">
          {`${currentObj === null ? 'Crear' : 'Actualizar'}`}
        </Button>
      </div>
    </Form>
  );
};

export default ObjectForm;
