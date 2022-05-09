import React from "react";
import "./Cadastro.css";
import {Formik, Form,Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import Axios from "axios";


// {}
const Cadastro = () => {

    const handleClickRegistro = (values) => {
        Axios.post("http://localhost:3001/register",{
            email: values.email,
            password: values.password,
            user_name: values.user_name,
        }).then((response) => {
            console.log(response);
        });
      };
    
      const validarCadastro = yup.object().shape({
          email: yup.string().email("não é um email").required("este camp é obrigatório"),
          password: yup.string().min(8, "A senha deve ter 8 caracteres").required("este camp é obrigatório"),
          confirmPassword: yup.string().oneOf([yup.ref("password"), null, "As senhas não são iguais" ])
      });

  return (
    <div className="cadastro-container">
        <h1>Cadastro</h1>
        <Formik initialValues={{}}  onSubmit={handleClickRegistro} validationSchema={validarCadastro}> 
            <Form className="cadastro-form">
                <div className="cadastro-form-grop" >
                    <label>Nome de usuário: </label>
                    <Field name='user_name' className='cadastro-form-field' placeholder='insira um user name' />
                    <ErrorMessage 
                        component='span'
                        name='use_name'
                        className="cadastro-form-error"
                    />
                </div>

                <div className="cadastro-form-grop" >
                    <label>Email: </label>
                    <Field name='email' className='cadastro-form-field' placeholder='Insira um email' />
                    <ErrorMessage 
                        component='span'
                        name='email'
                        className="cadastro-form-error"
                    />
                </div>

                <div className="cadastro-form-grop" >
                    <label>Senha: </label>
                    <Field name='password' className='cadastro-form-field' placeholder='insira uma senha' />
                    <ErrorMessage 
                        component='span'
                        name='password'
                        className="cadastro-form-error"
                    />
                </div>

                <div className="cadastro-form-grop" >
                    <label>Confirmar senha:</label>
                    <Field name='confirmPassword' className='cadastro-form-field' placeholder='insira sua senha' />
                    <ErrorMessage 
                        component='span'
                        name='confirmPassword'
                        className="cadastro-form-error"
                    />
                </div>
                <button className="cadastro-button" type="submit">Cadastrar</button>
            
            </Form>
        </Formik>
    </div>
  );
}

export default Cadastro;