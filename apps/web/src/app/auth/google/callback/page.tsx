"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processando login...');

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          setStatus('error');
          setMessage('Erro no login com Google');
          return;
        }

        if (code) {
          // Aqui você faria a troca do código por um token de acesso
          // Por simplicidade, vamos simular um login bem-sucedido
          
          // Simular delay da API
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Salvar dados simulados
          const userData = {
            id: 'google_user_' + Date.now(),
            email: 'usuario@gmail.com',
            name: 'Usuário Google',
            picture: '',
            verified_email: true
          };
          
          localStorage.setItem('googleUser', JSON.stringify(userData));
          localStorage.setItem('candidateEmail', userData.email);
          
          setStatus('success');
          setMessage('Login realizado com sucesso!');
          
          // Redirecionar após 2 segundos
          setTimeout(() => {
            router.push('/vagas');
          }, 2000);
        } else {
          setStatus('error');
          setMessage('Código de autorização não encontrado');
        }
      } catch (error) {
        console.error('Erro no callback do Google:', error);
        setStatus('error');
        setMessage('Erro ao processar login');
      }
    };

    handleGoogleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-md w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
          animate={{ rotate: status === 'loading' ? 360 : 0 }}
          transition={{ duration: 1, repeat: status === 'loading' ? Infinity : 0 }}
        >
          {status === 'loading' && (
            <Loader2 className="w-10 h-10 text-cyan-400" />
          )}
          {status === 'success' && (
            <CheckCircle className="w-10 h-10 text-green-400" />
          )}
          {status === 'error' && (
            <AlertCircle className="w-10 h-10 text-red-400" />
          )}
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-4">
          {status === 'loading' && 'Processando...'}
          {status === 'success' && 'Sucesso!'}
          {status === 'error' && 'Erro'}
        </h2>

        <p className="text-gray-300 mb-6">
          {message}
        </p>

        {status === 'success' && (
          <motion.p
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Redirecionando para a página de vagas...
          </motion.p>
        )}

        {status === 'error' && (
          <motion.button
            onClick={() => router.push('/vagas')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voltar para Vagas
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

export default function GoogleCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="w-10 h-10 text-cyan-400 mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-white mb-4">Carregando...</h2>
          <p className="text-gray-300">Processando login com Google</p>
        </motion.div>
      </div>
    }>
      <GoogleCallbackContent />
    </Suspense>
  );
}
