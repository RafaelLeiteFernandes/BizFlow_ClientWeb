// src/pages/home/index.tsx

import React from 'react';
import withAuth from '../../components/withAuth';

const HomePage: React.FC = () => {
  return <div>Bem-vindo à página inicial!</div>;
};

export default withAuth(HomePage);
