import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return <>{isAuthenticated ? children : null}</>;
};

export default PrivateRoute;
