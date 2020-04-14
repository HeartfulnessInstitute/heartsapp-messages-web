import * as React from 'react';
import { Form } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 }
    },
    wrapperCol: {
      xs: { span: 24 }
    }
  };


const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
    const hasError = meta.touched && meta.invalid;
    return (
      <FormItem
        {...formItemLayout}
        label={label}
        validateStatus={hasError ? "error" : "success"}
        hasFeedback={hasFeedback && hasError}
        help={hasError && meta.error}
        labelAlign={'left'}
      >
       
        <Component {...input} {...rest} children={children}  />
      </FormItem>
    );
  };

export default makeField;
