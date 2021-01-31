import React, { useState } from 'react';


import { withFirebase } from '../Firebase';


const PasswordChangeForm = (props) => { 
  
  const INITIAL_STATE = { 
    passwordOne: '', 
    passwordTwo: '', 
    error: null,
  };
  
  
  
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const {passwordOne, passwordTwo, error } = inputValues; 

  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { passwordOne, passwordTwo } = inputValues;
      await props.firebase.doPasswordUpdate(passwordOne);
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
        name="passwordOne" 
        value={passwordOne} 
        onChange={handleOnChange} 
        type="password" 
        placeholder="New Password"
      /> 
      <input
        name="passwordTwo" 
        value={passwordTwo} 
        onChange={handleOnChange} 
        type="password" 
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  )
}
export default withFirebase(PasswordChangeForm);