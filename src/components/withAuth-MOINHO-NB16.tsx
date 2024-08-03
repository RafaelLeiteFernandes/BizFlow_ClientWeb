// src/components/withAuth.tsx

import { useRouter } from 'next/router';
import { useEffect, useState, ComponentType } from 'react';

const withAuth = (WrappedComponent: ComponentType<any>) => {
  const Wrapper: React.FC = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
        } else {
          setIsAuthenticated(true);
        }
        setLoading(false);
      };

      checkAuth();

      window.addEventListener('storage', checkAuth);

      return () => {
        window.removeEventListener('storage', checkAuth);
      };
    }, [router]);

    if (loading) {
      return <div>Loading...</div>; // Ou um componente de carregamento mais estilizado
    }

    if (!isAuthenticated) {
      return null; // Você pode retornar um componente de redirecionamento ou uma mensagem de "não autenticado" aqui
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
