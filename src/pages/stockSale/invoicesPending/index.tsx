import React from 'react';
import PrivateRoute from '../../../components/login/PrivateRoute';
import BillingPendingList from '../../../components/stockSale/InvoicesPending';

const BillingPendingListPage: React.FC = () => {
  return (
    <PrivateRoute>
      <div>
        < BillingPendingList/>
      </div>
    </PrivateRoute>
  );
};

export default BillingPendingListPage;