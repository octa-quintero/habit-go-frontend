"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SpriteButton from '../../ui/Button/SpriteButton';
import PixelInput from '../../ui/Input/PixelInput';
import PixelText from '../../ui/Text/PixelText';
import { authService } from '@/lib/api/authService';

export interface RegisterFormProps {
  /** Callback opcional después de registro exitoso */
  onSuccess?: () => void;
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * RegisterForm - Formulario completo de registro con validación
 */
const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, className = '' }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Callback o redirección por defecto
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/login?registered=true');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrarse. Intenta de nuevo.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full flex flex-col gap-2 ${className}`}>
      <PixelInput
        label="Nombre"
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
      />

      <PixelInput
        label="Usuario"
        id="username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        disabled={loading}
      />

      <PixelInput
        label="Email"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        disabled={loading}
      />

      <PixelInput
        label="Pass"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
      />

      <PixelInput
        label="Confirm"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        disabled={loading}
      />

      {/* Error Message */}
      {error && (
        <div className="px-2 py-1 bg-red-100 border-2 border-red-500">
          <PixelText size="xs" color="text-red-700" align="center">
            {error}
          </PixelText>
        </div>
      )}

      {/* Submit Button */}
      <SpriteButton
        type="submit"
        label={loading ? 'Creando...' : 'Crear Cuenta'}
        disabled={loading}
        className="w-full"
      />
    </form>
  );
};

export default RegisterForm;
