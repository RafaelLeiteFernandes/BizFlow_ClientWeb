import React from 'react';
import PrivateRoute from '../../../components/login/PrivateRoute';
import SolicitationList from '../../../components/stockSale/ListSolicitationExp';

const ListSeparation: React.FC = () => {
  return (
    <PrivateRoute>
      <div>
        < SolicitationList/>
      </div>
    </PrivateRoute>
  );
};

export default ListSeparation;