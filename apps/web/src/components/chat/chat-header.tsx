"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Minimize2, 
  X, 
  Phone, 
  MessageCircle, 
  User, 
  Crown,
  AlertTriangle,
  Clock,
  MoreVertical,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CHAT_TYPOGRAPHY, CHAT_COLORS } from './design-system';
import type { ChatHeaderProps, ChatSession, User as ChatUser } from './types';

/**
 * ChatHeader - Cabeçalho do widget de chat profissional
 * 
 * Características:
 * - Informações do agente/usuário
 * - Status da sessão
 * - Controles do widget
 * - Indicadores de prioridade
 * - Menu de opções
 */
export const ChatHeader: React.FC<ChatHeaderProps> = ({
  session,
  user,
  onMinimize,
  onClose,
  onEscalate,
  showAvatar = true,
  showStatus = true,
  className,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  // Formatar status
  const getStatusInfo = () => {
    if (!session) return { text: 'Conectando...', color: 'text-gray-500', icon: Clock };

    switch (session.status) {
      case 'active':
        return { text: 'Online', color: 'text-green-500', icon: MessageCircle };
      case 'escalated':
        return { text: 'Com especialista', color: 'text-blue-500', icon: User };
      case 'inactive':
        return { text: 'Inativo', color: 'text-gray-500', icon: Clock };
      case 'archived':
        return { text: 'Arquivado', color: 'text-gray-400', icon: X };
      default:
        return { text: 'Desconhecido', color: 'text-gray-500', icon: Clock };
    }
  };

  // Formatar prioridade
  const getPriorityInfo = () => {
    if (!session || session.priority === 'normal') return null;

    const priorityConfig = {
      low: { color: 'text-blue-500', icon: MessageCircle, text: 'Baixa' },
      high: { color: 'text-orange-500', icon: AlertTriangle, text: 'Alta' },
      urgent: { color: 'text-red-500', icon: AlertTriangle, text: 'Urgente' },
    };

    return priorityConfig[session.priority as keyof typeof priorityConfig];
  };

  // Formatar tempo de resposta
  const getResponseTime = () => {
    if (!session) return null;
    
    const now = new Date();
    const lastActivity = new Date(session.lastActivity);
    const diff = now.getTime() - lastActivity.getTime();
    
    if (diff < 60000) return 'Respondendo agora';
    if (diff < 300000) return 'Resposta rápida';
    return 'Resposta normal';
  };

  const statusInfo = getStatusInfo();
  const priorityInfo = getPriorityInfo();
  const responseTime = getResponseTime();
  const StatusIcon = statusInfo.icon;

  return (
    <div className={cn(
      "relative z-10 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border-b border-white/10 p-4",
      className
    )}>
      {/* Informações do usuário/agente */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Avatar moderno */}
          {showAvatar && (
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              
              {/* Indicador de status */}
              {showStatus && (
                <motion.div
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          )}

          {/* Informações de texto */}
          <div>
            <h3 className="text-white font-bold text-lg">
              {user?.name || 'STARK AI'}
            </h3>
            <p className="text-cyan-400 text-sm flex items-center">
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {statusInfo.text}
              </motion.span>
              <span className="ml-2 text-xs">• Assistente Virtual</span>
            </p>
          </div>
        </div>

        {/* Controles modernos */}
        <div className="flex items-center space-x-2">
          {onEscalate && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onEscalate}
              className="p-2 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
              title="Escalar para especialista"
            >
              <Crown className="w-4 h-4" />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onMinimize}
            className="p-2 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
            title="Minimizar"
          >
            <Minimize2 className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 rounded-xl text-white/60 hover:text-red-400 transition-colors"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
