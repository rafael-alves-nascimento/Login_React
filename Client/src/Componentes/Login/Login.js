import React from "react";
import "./Login.css";
import {Formik, Form,Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import Axios from "axios";



// {}
const Login = () => {
    const handleClicklogin = (values) => {
        Axios.post("http://localhost:3001/login",{
            email: values.email,
            password: values.password,
        }).then((response) => {
            console.log(response)
        });
      };


  const validarLogin = yup.object().shape({
      email: yup.string().email("não é um email").required("este camp é obrigatório"),
      password: yup.string().min(8, "A senha deve ter 8 caracteres").required("este camp é obrigatório"),
  });

  return (
    <div className="login-container">
        <h1>Login</h1>
        <Formik initialValues={{}} onSubmit={handleClicklogin} validationSchema={validarLogin} >
            <Form className="login-form">
                <div className="login-form-grop" >
                    <label>Email: </label>
                    <Field name='email' className='login-form-field' placeholder='Insira seu email' />
                    <ErrorMessage 
                        component='span'
                        name='email'
                        className="login-form-error"
                    />
                </div>

                <div className="login-form-grop" >
                    <label>Senha: </label>
                    <Field name='password' className='login-form-field' placeholder='insira sua senha' />
                    <ErrorMessage 
                        component='span'
                        name='password'
                        className="login-form-error"
                    />
                </div>

                <button className="login-button" type="submit">Login</button>
                
            </Form>
        </Formik>
    </div>
  );
};

export default Login;