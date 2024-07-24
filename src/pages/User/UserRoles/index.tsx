import React from 'react';
import Layout from '../../../components/Layout';
import UserAccessControl from '../../../components/users/register/UserAccessControl';
import PrivateRoute from '../../../components/login/PrivateRoute';

const UserAccessControlForm: React.FC = () => {
  return (
    <PrivateRoute>
    <div>
      <UserAccessControl />
    </div>
  </PrivateRoute>
  );
};

export default UserAccessControlForm;
