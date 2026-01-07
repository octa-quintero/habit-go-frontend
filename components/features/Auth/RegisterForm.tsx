"use client";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PixelInput from '../../ui/Input/PixelInput';
import PixelText from '../../ui/Text/PixelText';
import { authService } from '@/lib/api/authService';

export interface RegisterFormProps {
  /** Callback opcional después de registro exitoso */
  onSuccess?: () => void;
  /** Clases CSS adicionales */
  className?: string;
  /** Ref para exponer métodos del formulario */
  formRef?: React.MutableRefObject<{ submit: () => void } | null>;
  /** Callback para loading state */
  onLoadingChange?: (loading: boolean) => void;
}

/**
 * RegisterForm - Formulario completo de registro con validación
 */
const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, className = '', formRef, onLoadingChange }) => {
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
  const formDataRef = useRef(formData);

  // Actualizar ref cuando formData cambia
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) {
      setError('');
    }
  };

  const handleSubmit = useCallback(async (e?: React.FormEvent | null) => {
    if (e) e.preventDefault();
    
    const currentData = formDataRef.current;

    // Validaciones básicas
    if (!currentData.name.trim() || !currentData.username.trim() || !currentData.email.trim() || !currentData.password || !currentData.confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (currentData.password !== currentData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (currentData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.register({
        name: currentData.name,
        username: currentData.username,
        email: currentData.email,
        password: currentData.password,
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
  }, [onSuccess, router]);

  // Exponer la función de submit a través del ref
  useEffect(() => {
    if (formRef) {
      formRef.current = { submit: handleSubmit };
    }
  }, [formRef, handleSubmit]);

  // Notificar cambios de loading
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

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
        label="Contraseña"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
      />

      <PixelInput
        label="Confirmar Contraseña"
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
    </form>
  );
};

export default RegisterForm;
