import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User } from '../../../types/system/User';
import { createUser } from '../../../services/userService'; // Ajuste o caminho conforme necessário
import Image from 'next/image';
import { TbEye, TbEyeOff } from 'react-icons/tb';

const UserForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      sector: '',
      full_name: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('O nome de usuário é obrigatório.'),
      email: Yup.string().email('Email inválido.').required('O email é obrigatório.'),
      sector: Yup.string().required('O setor é obrigatório.'),
      full_name: Yup.string().required('O nome completo é obrigatório.'),
      password: Yup.string()
        .required('A senha é obrigatória.')
        .min(8, 'A senha deve ter pelo menos 8 caracteres.')
        .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula.')
        .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula.')
        .matches(/[0-9]/, 'A senha deve conter pelo menos um número.')
        .matches(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'As senhas não coincidem.')
        .required('Confirmação de senha é obrigatória.'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Convert username to lowercase
        const lowercaseUsername = values.username.toLowerCase();
    
        // Remove confirmPassword from userData before sending
        const { confirmPassword, ...userData } = values;
    
        // Call createUser with lowercase username
        const response = await createUser({ ...userData, username: lowercaseUsername } as User);
    
        if (response) {
          alert(response); // Handle success
          resetForm();
        } else {
          alert('Erro ao cadastrar usuário.'); // Handle failure
        }
      } catch (error) {
        console.error('Error creating user:', error);
        alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="flex flex-col mx-2 px-10 justify-center items-center min-h-screen bg-gray-100 dark:bg-dark-gray">
      <div className="max-w-5xl w-full p-8 bg-white shadow-md rounded-lg flex flex-col md:flex-row dark:bg-dark-gray-2">
        <div className="w-full md:w-3/5 pr-0 md:pr-8 flex justify-center items-center">
          <div className="text-center w-full">
            <h1 className="text-2xl font-bold mb-4">Criar Novo Usuário</h1>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="text-start font-bold block text-sm text-gray-700 mb-2 dark:text-dark-text">
                  Nome de Usuário:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500 dark:bg-dark-gray-0.5 dark:border-none"
                />
                <div className="h-5">
                  {formik.touched.username && formik.errors.username ? (
                    <p className="text-red-500">{formik.errors.username}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-start font-bold block text-sm text-gray-700 mb-2 dark:text-dark-text">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500 dark:bg-dark-gray-0.5 dark:border-none"
                />
                <div className="h-5">
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-red-500">{formik.errors.email}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <label htmlFor="sector" className="text-start font-bold block text-sm text-gray-700 mb-2 dark:text-dark-text">
                  Setor:
                </label>
                <select
                  id="sector"
                  name="sector"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sector}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500 dark:bg-dark-gray-0.5 dark:border-none"
                >
                  <option value="">Selecione o setor</option>
                  <option value="TI">TI</option>
                  <option value="Vendas">Comercial</option>
                  <option value="RH">RH</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Expedição">Expedição</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operações">Produção</option>
                  <option value="Suporte">Suporte</option>
                </select>
                <div className="h-5">
                  {formik.touched.sector && formik.errors.sector ? (
                    <p className="text-red-500">{formik.errors.sector}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <label htmlFor="full_name" className="text-start font-bold block text-sm text-gray-700 mb-2 dark:text-dark-text">
                  Nome Completo:
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.full_name}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500 dark:bg-dark-gray-0.5 dark:border-none"
                />
                <div className="h-5">
                  {formik.touched.full_name && formik.errors.full_name ? (
                    <p className="text-red-500">{formik.errors.full_name}</p>
                  ) : null}
                </div>
              </div>
              <div className="relative">
                <label htmlFor="password" className="text-start font-bold block text-sm text-gray-700 mb-2 dark:text-dark-text">
                  Senha:
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500 dark:bg-dark-gray-0.5 dark:border-none" 
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  {showPassword ? <TbEyeOff /> : <TbEye />}
                </div>
                <div className="h-5">
                  {formik.touched.password && formik.errors.password ? (
                    <p className="text-red-500">{formik.errors.password}</p>
                  ) : null}
                </div>
              </div>
              <div className="relative">
                <label htmlFor="confirmPassword" className="text-start font-bold block text-sm text-gray-700 mb-2 dark:text-dark-text">
                  Confirmar Senha:
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500 dark:bg-dark-gray-0.5 dark:border-none"
                />
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  {showConfirmPassword ? <TbEyeOff /> : <TbEye />}
                </div>
                <div className="h-5">
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <p className="text-red-500">{formik.errors.confirmPassword}</p>
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-800 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Aguarde...' : 'Criar Usuário'}
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-2/5 flex justify-center items-center mt-8 md:mt-0">
          <Image src="/images/user.svg" alt="Ilustração" width={465} height={550} />
        </div>
      </div>
    </div>
  );
};

export default UserForm;
