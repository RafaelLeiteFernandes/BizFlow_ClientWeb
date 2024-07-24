import apiClient from './apiClient';
import axios from 'axios';

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  full_name: string;
  sector: string;
  permissions: string[];
  roles: string[];
}

export interface ILoginData {
  username: string;
  password: string;
}

export const authenticateUser = async (userData: ILoginData): Promise<ILoginResponse> => {
  try {
    const response = await apiClient.post<ILoginResponse>('/user/authenticate', userData);
    console.log('Authentication response:', response.data);

    // Adicionando um log detalhado da estrutura da resposta
    console.log('Response structure:', response);
    
    const { token, user } = response.data;  // Extraindo token e user da resposta
    localStorage.setItem('token', token); // Armazena o token JWT no localStorage
    console.log('Token stored in localStorage inside authenticateService:', localStorage.getItem('token'));

    return { token, user };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error authenticating user:', error.response?.data || error.message);
      throw new Error(error.response?.data.message || 'Unable to authenticate user. Please try again later.');
    } else {
      console.error('Error authenticating user:', error);
      throw new Error('Unable to authenticate user. Please try again later.');
    }
  }
};
