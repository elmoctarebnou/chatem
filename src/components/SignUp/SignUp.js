import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


const SignUpPage = () => {
  return (
    <div>
      <h1>SignUpPage</h1>
      <SignUpForm/>
    </div>
    
  );
}


const SignUpFormBase = (props) => {

  const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
  };

  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const { username, email, passwordOne, passwordTwo, error } = inputValues; 

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { username, email, passwordOne } = inputValues;
      const authUser = await props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne);
      setInputValues({...INITIAL_STATE});
      props.history.push(ROUTES.HOME);
    } catch (error) {
      setInputValues({ error })
    }
    
  }
  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({...inputValues, [name]: value});
  }
  const isInvalid = 
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  return (
    <form onSubmit={handleOnSubmit}>
      <input 
        onChange={handleOnChange} 
        type='text' 
        name='username' 
        value={username} 
        placeholder='Username'
      />
      <input 
        onChange={handleOnChange} 
        type='text' 
        name='email' 
        value={email} 
        placeholder='Email'
      />
      <input 
        onChange={handleOnChange} 
        type='password' 
        name='passwordOne' 
        value={passwordOne} 
        placeholder='Password'
      />
      <input 
        onChange={handleOnChange} 
        type='password' 
        name='passwordTwo' 
        value={passwordTwo} 
        placeholder='Re-enter Password'
      />
      <button disabled={isInvalid} type='submit'>Sign Up</button>

      {error && <p>{error.message}</p>}

    </form>
  )
}

const SignUpLink = () => {
  return (<p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>)
}
const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };