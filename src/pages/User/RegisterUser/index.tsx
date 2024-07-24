import React from 'react';
import PrivateRoute from '../../../components/login/PrivateRoute';
import UserForm from '../../../components/users/register/UserForm';

const Userpage: React.FC = () => {
  return (
    <PrivateRoute>
      <div>
        <UserForm />
      </div>
    </PrivateRoute>
  );
};

export default Userpage;
