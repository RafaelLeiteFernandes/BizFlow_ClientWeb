import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { changeUserPassword } from '../../../services/userService'; // Ajuste o caminho conforme necessário
import { TbEye, TbEyeOff } from "react-icons/tb";
import { useAuth } from '../../../context/authContext';

const ChangePasswordForm: React.FC = () => {
  const { user } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('A senha atual é obrigatória.'),
      newPassword: Yup.string()
        .required('A nova senha é obrigatória.')
        .min(8, 'A nova senha deve ter pelo menos 8 caracteres.')
        .matches(/[A-Z]/, 'A nova senha deve conter pelo menos uma letra maiúscula.')
        .matches(/[a-z]/, 'A nova senha deve conter pelo menos uma letra minúscula.')
        .matches(/[0-9]/, 'A nova senha deve conter pelo menos um número.')
        .matches(/[^A-Za-z0-9]/, 'A nova senha deve conter pelo menos um caractere especial.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'As senhas não coincidem.')
        .required('Confirmação da nova senha é obrigatória.'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { currentPassword, newPassword } = values;
        const response = await changeUserPassword(currentPassword, newPassword);
        if (response) {
          alert('Senha alterada com sucesso');
          resetForm();
        } else {
          alert('Erro ao alterar senha.');
        }
      } catch (error) {
        console.error('Erro ao alterar senha:', error);
        alert('Erro ao alterar senha. Por favor, tente novamente.');
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="max-w-2xl w-full p-6 bg-white shadow-md rounded-lg dark:bg-dark-gray-1">
      <h1 className="text-xl font-bold mb-4 dark:text-dark-text">Alterar Senha</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="text-start font-bold block text-sm text-gray-700 mb-1 dark:text-dark-text">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user?.full_name || ''}
            readOnly
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-gray-500 bg-gray-100 dark:bg-dark-gray-0.5 dark:border-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-start font-bold block text-sm text-gray-700 mb-1 dark:text-dark-text">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user?.email || ''}
            readOnly
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-gray-500 bg-gray-100 dark:bg-dark-gray-0.5 dark:border-none"
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="currentPassword" className="text-start font-bold block text-sm text-gray-700 mb-1 dark:text-dark-text">
            Senha Atual:
          </label>
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            id="currentPassword"
            name="currentPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentPassword}
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-gray-500 dark:bg-dark-gray-0.5 dark:border-none"
          />
          <div
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          >
            {showCurrentPassword ? <TbEyeOff /> : <TbEye />}
          </div>
          <div className="h-4">
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <p className="text-red-500 text-xs">{formik.errors.currentPassword}</p>
            ) : null}
          </div>
        </div>
        <div className="mb-4 relative">
          <label htmlFor="newPassword" className="text-start font-bold block text-sm text-gray-700 mb-1 dark:text-dark-text">
            Nova Senha:
          </label>
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="newPassword"
            name="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-gray-500 dark:bg-dark-gray-0.5 dark:border-none"
          />
          <div
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          >
            {showNewPassword ? <TbEyeOff /> : <TbEye />}
          </div>
          <div className="h-4">
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <p className="text-red-500 text-xs">{formik.errors.newPassword}</p>
            ) : null}
          </div>
        </div>
        <div className="mb-4 relative">
          <label htmlFor="confirmPassword" className="text-start font-bold block text-sm text-gray-700 mb-1 dark:text-dark-text">
            Confirmar Nova Senha:
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-gray-500 dark:bg-dark-gray-0.5 dark:border-none"
          />
          <div
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          >
            {showConfirmPassword ? <TbEyeOff /> : <TbEye />}
          </div>
          <div className="h-4">
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 text-xs">{formik.errors.confirmPassword}</p>
            ) : null}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => formik.resetForm()}
            className="bg-white border border-gray-400 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            Limpar
          </button>
          <button
            type="submit"
            className="bg-cyan-800 hover:bg-cyan-900 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Aguarde...' : 'Confirmar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
