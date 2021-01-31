import React from 'react';
import { PasswordForgetForm } from '../PasswordForget/PasswordForget';
import PasswordChangeForm from '../PasswordChange/PasswordChange';

const AccountPage = () => {
  return (
    <div>
      <h1>Account</h1>
      <PasswordForgetForm/>
      <PasswordChangeForm/>      
    </div>
  );
}

export default AccountPage;