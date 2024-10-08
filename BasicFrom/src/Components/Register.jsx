import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Color } from 'e-color/dist/common';
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
    if (!values.fullName) {
      errors.fullName = 'fullname Required';
    } else if (values.fullName.length > 15) {
      errors.fullName = 'Must be 15 characters or less';
    }
  
    if (!values.email) {
      errors.email = 'email Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.username) {
        errors.username = 'username Required';
      } else if (values.username.length > 20) {
        errors.username = 'Must be 20 characters or less';
    }
    if (!values.password) {
        errors.password = 'password Required';
      } else if (values.password.length < 8) {
        errors.password = 'Must be above 8 characters';
      }
  
    return errors;
  };
function Register({toggleForm}){
    const formik = useFormik({
        initialValues: {
            fullName : "",
            email: "",
            username : "",
            password : "",
        },
        validate,
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const data = await response.json();
                alert(data.message);
                formik.resetForm();
            } catch (e) {
                console.error(e);
                alert('error occurred registration');
            }
        },
        });
    return(
        <>
        <h2>Register Here</h2>
        <form onSubmit={formik.handleSubmit}>
            <input type="text" placeholder="Full Name" name='fullName' onChange={formik.handleChange} value={formik.values.fullName} /><br />
            {formik.errors.fullName ? <div style={style_.div}>{formik.errors.fullName}</div> : null}

            <input type="email" placeholder="Email" name='email' onChange={formik.handleChange} value={formik.values.email} /><br />
            {formik.errors.email ? <div style={style_.div}>{formik.errors.email}</div> : null}

            <input type="text" placeholder="Username" name='username' onChange={formik.handleChange} value={formik.values.username} /><br />
            {formik.errors.username ? <div style={style_.div}>{formik.errors.username}</div> : null}

            <input type="password" placeholder="Password" name='password' onChange={formik.handleChange} value={formik.values.password} /><br />
            {formik.errors.password ? <div style={style_.div}>{formik.errors.password}</div> : null}
            <br />
            <button type="submit">Register</button>
        </form>
        <a onClick={toggleForm} style={style_.a}>Already have an account?</a>
        </>
    );
}
export default Register;