"use client";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PixelInput from '../../ui/Input/PixelInput';
import PixelText from '../../ui/Text/PixelText';
import { authService } from '@/lib/api/authService';

export interface LoginFormProps {
  /** Callback opcional después de login exitoso */
  onSuccess?: () => void;
  /** Clases CSS adicionales */
  className?: string;
  /** Ref para exponer métodos del formulario */
  formRef?: React.MutableRefObject<{ submit: () => void } | null>;
  /** Callback para loading state */
  onLoadingChange?: (loading: boolean) => void;
}

/**
 * LoginForm - Formulario de inicio de sesión con validación
 */
const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, className = '', formRef, onLoadingChange }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formDataRef = useRef(formData);

  // Actualizar ref cuando formData cambia
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (error) {
      setError('');
    }
  };

  const handleSubmit = useCallback(async (e?: React.FormEvent | null) => {
    if (e) e.preventDefault();
    
    const currentData = formDataRef.current;

    // Validaciones básicas
    if (!currentData.username.trim() || !currentData.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // El backend espera email, pero aceptaremos username también
      await authService.login({
        email: currentData.username,
        password: currentData.password,
      });

      // TODO: Implementar lógica de "Recuérdame" con localStorage
      if (currentData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      // Callback o redirección por defecto
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión. Verifica tus credenciales.';
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
    <form onSubmit={handleSubmit} className={`w-full flex flex-col gap-3 ${className}`}>
      <PixelInput
        label="Usuario"
        id="username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        disabled={loading}
        placeholder="tu_usuario"
      />

      <PixelInput
        label="Contraseña"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
        placeholder="••••••••"
      />

      {/* Recuérdame y Olvidé contraseña */}
      <div className="w-full flex flex-row items-center justify-between gap-2">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            disabled={loading}
            className="w-4 h-4 cursor-pointer accent-primary"
          />
          <PixelText 
            size="xs" 
            color="text-gray-700 group-hover:text-black"
            className="transition-colors duration-200"
          >
            Recuérdame
          </PixelText>
        </label>

        <a 
          href="/auth/forgot-password" 
          className="text-[0.5rem] font-press-start text-gray-700 hover:text-primary hover:underline transition-all duration-200"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

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

export default LoginForm;
