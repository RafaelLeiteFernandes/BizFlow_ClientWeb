// src/services/authService.ts

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData): Promise<void> => {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao fazer login');
  }

  const responseData = await response.json();
  localStorage.setItem('token', responseData.token); // Armazene o token no localStorage
  window.dispatchEvent(new Event('storage')); // Notifique o sistema da alteração de estado
};

export const logout = () => {
  localStorage.removeItem('token'); // Remove o token do localStorage
  window.dispatchEvent(new Event('storage')); // Notifique o sistema da alteração de estado
};
