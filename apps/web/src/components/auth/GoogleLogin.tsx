"use client";

import React from "react";
import { motion } from "framer-motion";

interface GoogleLoginProps {
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
  className?: string;
  children?: React.ReactNode;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ 
  onSuccess, 
  onError, 
  className = "",
  children 
}) => {
  const handleGoogleLogin = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      
      // Verificar se o client_id está configurado
      if (!clientId || clientId === "your_google_client_id") {
        // Simular login com Google para desenvolvimento
        console.log("Google Client ID não configurado, simulando login...");
        const mockUserData = {
          id: 'google_user_' + Date.now(),
          email: 'usuario@gmail.com',
          name: 'Usuário Google',
          picture: 'https://via.placeholder.com/150',
          verified_email: true
        };
        
        // Salvar dados do usuário
        localStorage.setItem('googleUser', JSON.stringify(mockUserData));
        localStorage.setItem('candidateEmail', mockUserData.email);
        
        if (onSuccess) {
          onSuccess(mockUserData);
        } else {
          alert(`Login simulado realizado com sucesso! Bem-vindo, ${mockUserData.name}`);
        }
        return;
      }

      // Verificar se o Google Identity Services está disponível
      if (typeof window !== 'undefined' && window.google) {
        // Implementação com Google Identity Services (mais moderno)
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse
        });
        
        window.google.accounts.id.prompt();
      } else {
        // Fallback para OAuth tradicional
        const redirectUri = `${window.location.origin}/auth/google/callback`;
        const scope = 'email profile';
        const responseType = 'code';
        
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
          `client_id=${clientId}&` +
          `redirect_uri=${encodeURIComponent(redirectUri)}&` +
          `scope=${encodeURIComponent(scope)}&` +
          `response_type=${responseType}&` +
          `access_type=offline&` +
          `prompt=consent`;
        
        window.location.href = authUrl;
      }
    } catch (error) {
      console.error("Erro no login com Google:", error);
      if (onError) {
        onError(error);
      } else {
        alert("Erro ao fazer login com Google. Tente novamente.");
      }
    }
  };

  const handleCredentialResponse = (response: any) => {
    try {
      // Decodificar o JWT token
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const userData = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        verified_email: payload.email_verified
      };
      
      // Salvar dados do usuário
      localStorage.setItem('googleUser', JSON.stringify(userData));
      localStorage.setItem('candidateEmail', userData.email);
      
      if (onSuccess) {
        onSuccess(userData);
      } else {
        // Feedback padrão
        alert(`Login realizado com sucesso! Bem-vindo, ${userData.name}`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao processar resposta do Google:", error);
      if (onError) {
        onError(error);
      }
    }
  };

  // Carregar Google Identity Services
  React.useEffect(() => {
    const loadGoogleScript = () => {
      if (typeof window !== 'undefined' && !window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    };

    loadGoogleScript();
  }, []);

  return (
    <motion.button
      onClick={handleGoogleLogin}
      className={`w-full px-6 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children || (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar com Google
        </>
      )}
    </motion.button>
  );
};

// Declaração global para TypeScript
declare global {
  interface Window {
    google: any;
  }
}

export default GoogleLogin;
