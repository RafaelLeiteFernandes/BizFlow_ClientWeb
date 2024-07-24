import apiClient from './apiClient';

const API_URL = '/access/user-acl';

export async function updateUserAccessControlList(data: { usuario_id: number, permissao_ids: number[], regra_ids: number[] }) {
  try {
    const response = await apiClient.post(API_URL, data);
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);

    if (response.status === 200 || response.status === 201) {
      return 'Permissões e regras cadastradas com sucesso';
    } else {
      const errorData = response.data;
      throw new Error(errorData.error || 'Erro ao cadastrar permissões e regras');
    }
  } catch (error) {
    console.error('Erro ao cadastrar permissões e regras:', error);
    throw new Error(error.message || 'Erro ao cadastrar permissões e regras');
  }
}
