import React from 'react';
import PrivateRoute from '../../../components/login/PrivateRoute';
import MySolicitations from '../../../components/stockSale/MySolicitations';

const MySolicitationsPage: React.FC = () => {
  return (
    <PrivateRoute>
      <div>
        < MySolicitations/>
      </div>
    </PrivateRoute>
  );
};

export default MySolicitationsPage;