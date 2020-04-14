import * as React from 'react';
import { Field, reduxForm } from "redux-form";
import { Input, Button, Card, Form } from "antd";
// import  Form  from 'antd/lib/form';
import Header from '../../Layout/Header';

import MakeField from '../../components/Forms/MakeField';

const AInput = MakeField(Input)
const Login = (props) => {
  let { handleSubmit, pristine, submitting , handleChange} = props

  const submit = (values) =>{
    console.log(values)
  }
    return(
      <React.Fragment>
        <Header />
        <div style={{'display': 'flex', alignItems: 'center', justifyContent: 'center', 'height': 'calc(100vh - 64px)'}}>
          <Card>
            <Form onFinish={handleSubmit(submit)}>
            <h2 style={{'textAlign': "center"}}>Login</h2>
            <Field label="Email" name="email" component={AInput} placeholder="email" hasFeedback onChange={handleChange}/>

            <Field  abel="Password" name="password" component={AInput} placeholder="Password" hasFeedback onChange={handleChange} />
            <Form.Item style={{'textAlign': 'center'}}>
            <Button type="primary" disabled={pristine || submitting} htmlType="submit" loading={submitting}>
              Submit
            </Button>
            </Form.Item>
            </Form>
          </Card>
        </div>
      </React.Fragment>
    )
}

const validate = values => {
    const errors = {password: '', email: ''};
    if (!values.password) {
      errors.password = "Required";
    }
    if(!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email";
    }
  
    return errors;
  };

  export default reduxForm({
    form: "loginForm", // a unique identifier for this form
    validate
  })(Login);
  
