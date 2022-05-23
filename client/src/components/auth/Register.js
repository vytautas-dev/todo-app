import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const { email, password, password2 } = formData;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const errors = useSelector((state) => state.alert)

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("Passwords do not match", "danger"));
    } else {
      dispatch(register({ email, password }));
    }
  };

  if (isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  return (
    <>
      <h1> Register </h1>
      <form className='todo-form' onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group-auth'>
          <input
            className='login-input'
            type='email'
            placeholder='Email Address'
            name='email'
            required
            onChange={(e) => handleChange(e)}
          />

          <input
            className='login-input'
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            required
            onChange={(e) => handleChange(e)}
          />
          <input
            className='login-input'
            type='password'
            placeholder='Password'
            name='password2'
            minLength='6'
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <input type='submit' className='login-btn' value='Submit' />
        {errors.map(error => (<ul key={error.id} style={{color: "red", listStyle: "none", marginBottom: "20px"}}> <li> ! {error.msg} </li></ul>))}
      </form>
      <p className='my-1'>
        Do you have an account? <br></br> <Link to='/login'>Log In</Link>
      </p>
    </>
  );
};

export default Register;
