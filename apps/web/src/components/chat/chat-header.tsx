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
import type { ChatHeaderProps, ChatSession, User } from './types';

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
      "flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700",
      className
    )}>
      {/* Informações do usuário/agente */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {/* Avatar */}
        {showAvatar && (
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center relative">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-medium text-lg">
                  {user?.name?.charAt(0)?.toUpperCase() || '?'}
                </span>
              )}
              
              {/* Indicador de status */}
              {showStatus && (
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900",
                  statusInfo.color === 'text-green-500' ? 'bg-green-500' : 'bg-gray-400'
                )} />
              )}
            </div>
          </div>
        )}

        {/* Informações de texto */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className={cn(
              "font-semibold text-gray-900 dark:text-gray-100 truncate",
              CHAT_TYPOGRAPHY.fontSize.lg,
              CHAT_TYPOGRAPHY.fontWeight.semibold
            )}>
              {user?.name || 'STARK Assistant'}
            </h3>
            
            {/* Indicador de função */}
            {user?.role === 'agent' && (
              <Crown className="w-4 h-4 text-yellow-500" />
            )}
            
            {/* Indicador de prioridade */}
            {priorityInfo && (
              <div className={cn(
                "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
                priorityInfo.color === 'text-orange-500' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                priorityInfo.color === 'text-red-500' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              )}>
                <priorityInfo.icon className="w-3 h-3" />
                <span>{priorityInfo.text}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <StatusIcon className={cn("w-4 h-4", statusInfo.color)} />
            <span className={cn("text-gray-600 dark:text-gray-400", statusInfo.color)}>
              {statusInfo.text}
            </span>
            
            {responseTime && (
              <>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-gray-500 dark:text-gray-500 text-xs">
                  {responseTime}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Menu de opções */}
      <div className="relative flex items-center space-x-2">
        {/* Botão de menu */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Menu de opções"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {/* Menu dropdown */}
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
          >
            <div className="py-1">
              <button
                onClick={() => {
                  onEscalate?.();
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Falar com especialista</span>
              </button>
              
              <button
                onClick={() => {
                  // TODO: Implementar configurações
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Configurações</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Botão de minimizar */}
        <button
          onClick={onMinimize}
          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Minimizar chat"
        >
          <Minimize2 className="w-5 h-5" />
        </button>

        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Fechar chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
