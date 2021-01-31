import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase'; 
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => ( <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);


  
const PasswordForgetFormBase = (props) => {

  const INITIAL_STATE = { 
    email: '',
    error: null
  };
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const { email , error } = inputValues; 

  const isInvalid = email === '';
  
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email } = inputValues;
      const authUser = await props.firebase.doPasswordReset(email);
      setInputValues({...INITIAL_STATE});
    } catch (error) {
      setInputValues({error})
    }
    
  }
  const handleOnChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputValues({...inputValues, [name]: value});
  }

  return (
      <form onSubmit={handleOnSubmit}>
        <input
          name="email" 
          value={email} 
          onChange={handleOnChange} 
          type="text" 
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
          {error && <p>{error.message}</p>}
      </form>
  ); 
}


const PasswordForgetLink = () => ( <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink }

