import React, { useState} from 'react';
import { Link, withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp/SignUp'
import { PasswordForgetLink } from '../PasswordForget/PasswordForget';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';


const SignInPage = () => {
  return (
    <div>
      <h1>SignInPage</h1>
      <SignInForm/>
      <PasswordForgetLink/>
      <SignUpLink/>
    </div>
    
  );
}


const SignInFormBase = (props) => {

  const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
  };

  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const {email, password, error } = inputValues; 

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = inputValues;
    const authUser = await props.firebase.doSignInWithEmailAndPassword(email, password);
    setInputValues({...INITIAL_STATE});
    props.history.push(ROUTES.HOME);
  }
  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({...inputValues, [name]: value});
  }
  const isInvalid =
    password === '' ||
    email === '';

  return (
    <form onSubmit={handleOnSubmit}>
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
        name='password' 
        value={password} 
        placeholder='Password'
      />
      <button disabled={isInvalid} type='submit'>Sign In</button>

      {error && <p>{error.message}</p>}

    </form>
  )
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;
export { SignInForm };