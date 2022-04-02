import React, { useEffect } from 'react';
import moment from 'moment';
import { Button, Form, Input, DatePicker, Row, Col } from 'antd';
import { DateRangeAfter, DateRangeBefore } from 'utils/filter-params';
import { formatDateToParser } from 'utils/contants';

const { RangePicker } = DatePicker;

const FilterForm = ({ onSubmit, onCancel, appliedFilters, filtersData }) => {
  const [form] = Form.useForm();

  const getFilterDataToForm = () => {
    const data = {};
    for (const [key, value] of Object.entries(appliedFilters)) {
      if (filtersData[key]?.inForm) {
        if (filtersData[key].type === DateRangeAfter) {
          // Remove underscore and "after" word
          const key_in_form = key.replace(/_[a-z]*$/, "");
          // const key_in_form = key.replace("_after", "");
          const value_in_form = value ? moment(value, formatDateToParser) : undefined;

          if (data[key_in_form]) {
            data[key_in_form] = [value_in_form, ...data[key_in_form]];
          } else {
            data[key_in_form] = [value_in_form];
          }
        } else if (filtersData[key].type === DateRangeBefore) {
          const key_in_form = key.replace(/_[a-z]*$/, "");
          // const key_in_form = key.replace("_before", "");
          const value_in_form = value ? moment(value, formatDateToParser) : undefined;

          if (data[key_in_form]) {
            data[key_in_form] = [...data[key_in_form], value_in_form];
          } else {
            data[key_in_form] = [value_in_form];
          }
        } else {
          data[key] = value;
        }
        
      }
    }
    return data;
  };

  useEffect(() => {
    if (appliedFilters != null) {
      form.setFieldsValue({ ...getFilterDataToForm() });
    }
  }, [appliedFilters]); // eslint-disable-line react-hooks/exhaustive-deps


  const onFinish = values => {
    const [date_joined_range_after, date_joined_range_before] = values.date_joined_range;
    const data = {
      ...values,
      date_joined_range_after,
      date_joined_range_before
    };
    if (data.date_joined_range) {
      delete data.date_joined_range;
    }
    onSubmit(data);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Row gutter={24}>
        <Col sm={24} md={8} lg={8}>
          <Form.Item label="Nombre" name="first_name">
            <Input placeholder="Ingresa el nombre completo" />
          </Form.Item>
        </Col>
        <Col sm={24} md={8} lg={8}>
          <Form.Item label="Apellido" name="last_name">
            <Input placeholder="Ingresa el apellido completo" />
          </Form.Item>
        </Col>

        <Col sm={24} md={8} lg={8}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Ingresa el email" />
          </Form.Item>
        </Col>

        <Col sm={24} md={8} lg={8}>
          <Form.Item label="Fecha de registro" name="date_joined">
            <DatePicker format={formatDateToParser} />
          </Form.Item>
        </Col>

        <Col sm={24} md={8} lg={8}>
          <Form.Item label="Fecha" name="date_joined_range">
            <RangePicker format={formatDateToParser} />
          </Form.Item>
        </Col>
      </Row>
      <div className="drawer-footer">
        <Button
          type="secondary"
          onClick={onCancel}
          className="btn-forms-action"
        >
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit" className="btn-forms-action">
          Aplicar filtros
        </Button>
      </div>
    </Form>
  );
};

export default FilterForm;
