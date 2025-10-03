"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cookie,
  Settings,
  Shield,
  BarChart3,
  Target,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Info,
  Sparkles
} from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  performance: boolean;
}

interface ModernCookieConsentProps {
  onAccept?: (preferences: CookiePreferences) => void;
  onReject?: (preferences: CookiePreferences) => void;
}

const ModernCookieConsent: React.FC<ModernCookieConsentProps> = ({
  onAccept,
  onReject
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    performance: false
  });

  const cookieTypes = [
    {
      id: 'necessary' as keyof CookiePreferences,
      name: 'Cookies Necessários',
      description: 'Essenciais para o funcionamento básico do site',
      icon: Shield,
      required: true,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'analytics' as keyof CookiePreferences,
      name: 'Cookies de Análise',
      description: 'Nos ajudam a entender como você usa o site',
      icon: BarChart3,
      required: false,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'performance' as keyof CookiePreferences,
      name: 'Cookies de Performance',
      description: 'Melhoram a velocidade e funcionalidade do site',
      icon: Target,
      required: false,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'marketing' as keyof CookiePreferences,
      name: 'Cookies de Marketing',
      description: 'Personalizam anúncios e conteúdo para você',
      icon: Target,
      required: false,
      color: 'from-orange-500 to-red-600'
    }
  ];

  // Verificar se já existe consentimento
  useEffect(() => {
    const consent = localStorage.getItem('stark-cookie-consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000); // Delay para não interferir no carregamento
    }
  }, []);

  // Salvar preferências
  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('stark-cookie-consent', JSON.stringify({
      preferences: prefs,
      timestamp: Date.now(),
      version: '1.0'
    }));
    
    // Disparar evento customizado
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', {
      detail: prefs
    }));
  };

  // Aceitar todos
  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      performance: true
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
    setIsVisible(false);
    onAccept?.(allAccepted);
  };

  // Aceitar selecionados
  const handleAcceptSelected = () => {
    savePreferences(preferences);
    setIsVisible(false);
    onAccept?.(preferences);
  };

  // Rejeitar todos
  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      performance: false
    };
    setPreferences(onlyNecessary);
    savePreferences(onlyNecessary);
    setIsVisible(false);
    onReject?.(onlyNecessary);
  };

  // Toggle preferência
  const togglePreference = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return; // Não pode desabilitar cookies necessários
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowDetails(false)}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="relative p-6 border-b border-white/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  🍪 Preferências de Cookies
                </h2>
                <p className="text-white/70 text-sm">
                  Respeitamos sua privacidade. Escolha quais cookies aceitar.
                </p>
              </div>
            </div>
            
            {/* Efeito de partículas */}
            <div className="absolute top-4 right-4">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-6 h-6 text-purple-400" />
              </motion.div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 flex-1 overflow-y-auto">
            {!showDetails ? (
              /* Vista resumida */
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-white/80 text-sm leading-relaxed">
                    <p>
                      Usamos cookies para melhorar sua experiência, personalizar conteúdo e 
                      analisar nosso tráfego. Alguns cookies são essenciais para o funcionamento 
                      do site, outros são opcionais.
                    </p>
                  </div>
                </div>

                {/* Resumo das preferências */}
                <div className="grid grid-cols-2 gap-3">
                  {cookieTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-3 rounded-lg border ${
                        preferences[type.id]
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-gray-800/50 border-gray-700/50'
                      } transition-all`}
                    >
                      <div className="flex items-center space-x-2">
                        <type.icon className={`w-4 h-4 ${
                          preferences[type.id] ? 'text-green-400' : 'text-gray-400'
                        }`} />
                        <span className={`text-xs font-medium ${
                          preferences[type.id] ? 'text-green-300' : 'text-gray-400'
                        }`}>
                          {type.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botões principais */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAcceptAll}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-green-500/25"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>Aceitar Todos</span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDetails(true)}
                    className="flex-1 bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all border border-white/20"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Personalizar</span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRejectAll}
                    className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-600 transition-all"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <X className="w-4 h-4" />
                      <span>Apenas Necessários</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            ) : (
              /* Vista detalhada */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Configurações Detalhadas
                  </h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                </div>

                {/* Lista de tipos de cookies */}
                <div className="space-y-4">
                  {cookieTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border transition-all ${
                        preferences[type.id]
                          ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30'
                          : 'bg-gray-800/50 border-gray-700/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center flex-shrink-0`}>
                            <type.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-white">{type.name}</h4>
                              {type.required && (
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                                  Necessário
                                </span>
                              )}
                            </div>
                            <p className="text-white/70 text-sm mt-1">
                              {type.description}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => togglePreference(type.id)}
                          disabled={type.required}
                          className={`ml-4 w-12 h-6 rounded-full transition-all ${
                            preferences[type.id]
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                              : 'bg-gray-600'
                          } ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <motion.div
                            className={`w-5 h-5 bg-white rounded-full shadow-lg ${
                              preferences[type.id] ? 'ml-6' : 'ml-0.5'
                            }`}
                            animate={{
                              x: preferences[type.id] ? 24 : 2
                            }}
                            transition={{ duration: 0.2 }}
                          />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Botões de ação */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAcceptSelected}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-purple-500/25"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>Salvar Preferências</span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAcceptAll}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-green-500/25"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>Aceitar Todos</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gradient-to-r from-white/5 to-white/10 border-t border-white/10">
            <p className="text-white/60 text-xs text-center">
              Ao continuar, você concorda com nossa{' '}
              <a href="/politica-privacidade" className="text-purple-400 hover:text-purple-300 underline">
                Política de Privacidade
              </a>
              {' '}e{' '}
              <a href="/politica-cookies" className="text-purple-400 hover:text-purple-300 underline">
                Política de Cookies
              </a>
              .
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModernCookieConsent;
