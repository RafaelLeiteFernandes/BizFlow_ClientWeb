import React from 'react';
import PrivateRoute from '../components/login/PrivateRoute';

const ProtectedPage: React.FC = () => {
  return (
    <PrivateRoute>
      <div>
        <h1>Protected Page</h1>
        <p>This content is protected and only visible to authenticated users.</p>
      </div>
    </PrivateRoute>
  );
};

export default ProtectedPage;
