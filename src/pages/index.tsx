import React from 'react';
import PrivateRoute from '../components/login/PrivateRoute';
import { useAuth } from '../context/authContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <PrivateRoute>
      <div className='h-screen flex flex-col justify-top items-center'>
        <h1 className="mt-10 text-4xl font-bold">Bem Vindo(a)!</h1>
        <h3 className="text-xl mt-4  font-bold">{user?.full_name}</h3>
      </div>
    </PrivateRoute>
  );
};

export default HomePage;
