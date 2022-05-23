import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const errors = useSelector((state) => state.alert)

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  return (
    <>
      <h1> Sign In </h1>
      <form className='todo-form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group-auth'>
          <input
            className='login-input'
            type='email'
            placeholder='Email Address'
            name='email'
            required
            onChange={(e) => onChange(e)}
          />

          <input
            className='login-input'
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='login-btn' value='Submit' />
       {errors.map(error => (<ul key={error.id} style={{color: "red", listStyle: "none", marginBottom: "20px"}}> <li> ! {error.msg} </li></ul>))}
      </form>
      <p className='my-1'>
        Don't have an account? <br></br><Link to='/register'>Sign Up</Link>{" "}
      </p>
    </>
  );
};

export default Login;
