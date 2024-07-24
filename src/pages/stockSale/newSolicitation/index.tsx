import React from 'react';
import PrivateRoute from '../../../components/login/PrivateRoute';
import CreateSolicitationForm from '../../../components/stockSale/CreateSolicitation';

const NewSolicitationPage: React.FC = () => {
  return (
    <PrivateRoute>
      <div>
        < CreateSolicitationForm/>
      </div>
    </PrivateRoute>
  );
};

export default NewSolicitationPage;