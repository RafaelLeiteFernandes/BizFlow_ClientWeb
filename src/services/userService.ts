import { User } from '../types/system/User';
import apiClient from './apiClient';

const API_URL = '/user';

export async function createUser(UserData: User): Promise<string | null> {
  try {
    const response = await apiClient.post(API_URL, UserData);
    if (response.status === 200) {
      return 'User cadastrada com sucesso';
    } else {
      const errorData = response.data;
      throw new Error(errorData.error || 'Erro ao cadastrar user');
    }
  } catch (error) {
    console.error('Erro ao cadastrar user:', error);
    return null;
  }
}

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get('/user/all');
    return response.data.users || [];
  } catch (error) {
    console.error('Error fetching itens:', error);
    throw new Error('Unable to fetch itens. Please try again later.');
  }
};

export const getUserById = async (id: number | string) => {
  try {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Unable to fetch user. Please try again later.');
  }
};

export const updateUser = async (id: string, userData: User) => {
  try {
    const response = await apiClient.put(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Unable to update user. Please try again later.');
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await apiClient.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Unable to delete user. Please try again later.');
  }
};

export const changeUserPassword = async (currentPassword: string, newPassword: string): Promise<string | null> => {
  try {
    const response = await apiClient.put('/user/password', { currentPassword, newPassword });
    if (response.status === 200) {
      return 'Senha alterada com sucesso';
    } else {
      throw new Error('Erro ao alterar senha');
    }
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    return null;
  }
};