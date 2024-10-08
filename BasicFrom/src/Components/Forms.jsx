import Login from './Login.jsx';
import Register from './Register.jsx'
import React, { useState } from 'react';
export default function Forms(){
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };
    return(
        <>
        {isLogin ? <Login toggleForm={toggleForm}/> : <Register toggleForm={toggleForm}/>}
        </>
    );
}