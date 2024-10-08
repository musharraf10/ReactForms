import React, { useState } from 'react';
import { useFormik } from 'formik';
const style_ = {
    div :{
        color : '#f69c9c',
        fontSize :'10px',
        lineHeight:"1",
        marginBottom : "10px",
    },
    a : {
        cursor: 'pointer',
    }
};


const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required';
      } else if (values.username.length > 20) {
        errors.username = 'Must be 20 characters or less';
    }
    if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length > 20) {
        errors.password = 'Must be 20 characters or less';
      }
    return errors;
  };
  
function Login({toggleForm}){
    const formik = useFormik({
        initialValues: {
          username: '',
          password :'',
        },
        validate,
        onSubmit: async(values) => {
            try{
                const response = await fetch('http://localhost:5000/login',{
                    method : 'post',
                    headers : {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),

                });
                const data = await response.json();
                alert(data.message);
                formik.resetForm();
            }catch(e){
                console.error(e);
                alert('error occurred login');
            }
            },
        });
    return(
        <>
        <h2>Login Here</h2>
        <form onSubmit={formik.handleSubmit}>
            <input type="text" placeholder="Username" name='username' onChange={formik.handleChange} value={formik.values.username} /><br />
            {formik.errors.username ? <div style={style_.div}>{formik.errors.username}</div> : null}
            <input type="password" placeholder="Password" name='password' onChange={formik.handleChange} value={formik.values.password} /><br />
            {formik.errors.password ? <div style={style_.div}>{formik.errors.password}</div> : null} <br />
            <button type="submit">Login</button>

        </form>
        <a onClick={toggleForm} style={style_.a}>Don't have an account?</a>
        </>
    );
}
export default Login;