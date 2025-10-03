"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Reply, 
  Heart, 
  MoreVertical,
  Download,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CHAT_TYPOGRAPHY, CHAT_EFFECTS, CHAT_COLORS } from './design-system';
import type { MessageBubbleProps, Message, User, Reaction } from './types';

/**
 * MessageBubble - Componente para exibir mensagens individuais
 * 
 * Características:
 * - Design responsivo e acessível
 * - Suporte a diferentes tipos de mensagem
 * - Indicadores de status (enviando, enviado, lido)
 * - Reações e respostas
 * - Animações suaves
 * - Tipografia otimizada
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  sender,
  showAvatar = true,
  showTimestamp = true,
  showStatus = true,
  isOwn = false,
  onReply,
  onReact,
  className,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [isReacting, setIsReacting] = useState(false);

  // Formatar timestamp
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) { // Menos de 1 minuto
      return 'Agora';
    } else if (diff < 3600000) { // Menos de 1 hora
      return `${Math.floor(diff / 60000)}min`;
    } else if (diff < 86400000) { // Menos de 1 dia
      return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  // Renderizar status da mensagem
  const renderMessageStatus = () => {
    if (!showStatus || !isOwn) return null;

    const statusIcons = {
      sending: <Clock className="w-3 h-3 text-gray-400" />,
      sent: <CheckCircle2 className="w-3 h-3 text-gray-400" />,
      delivered: <CheckCircle2 className="w-3 h-3 text-blue-500" />,
      read: <CheckCircle2 className="w-3 h-3 text-green-500" />,
      failed: <AlertCircle className="w-3 h-3 text-red-500" />,
    };

    return (
      <div className="flex items-center space-x-1 mt-1">
        {statusIcons[message.status]}
        {message.status === 'failed' && (
          <span className="text-xs text-red-500">Falha</span>
        )}
      </div>
    );
  };

  // Renderizar anexos
  const renderAttachments = () => {
    if (!message.attachments || message.attachments.length === 0) return null;

    return (
      <div className="mt-2 space-y-2">
        {message.attachments.map((attachment, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex-shrink-0">
              {attachment.type.startsWith('image/') ? (
                <Eye className="w-4 h-4 text-gray-500" />
              ) : (
                <Download className="w-4 h-4 text-gray-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {attachment.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(attachment.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={() => window.open(attachment.url, '_blank')}
              className="flex-shrink-0 p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  // Renderizar reações
  const renderReactions = () => {
    if (!message.reactions || message.reactions.length === 0) return null;

    const reactionCounts = message.reactions.reduce((acc, reaction) => {
      acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {Object.entries(reactionCounts).map(([emoji, count]) => (
          <button
            key={emoji}
            onClick={() => onReact?.(message, emoji)}
            className={cn(
              "flex items-center space-x-1 px-2 py-1 rounded-full text-xs",
              "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600",
              "transition-colors duration-200"
            )}
          >
            <span>{emoji}</span>
            <span>{count}</span>
          </button>
        ))}
      </div>
    );
  };

  // Renderizar avatar
  const renderAvatar = () => {
    if (!showAvatar || isOwn) return null;

    return (
      <div className="flex-shrink-0 mr-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
          {sender?.avatar ? (
            <img
              src={sender.avatar}
              alt={sender.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <span className="text-white text-sm font-medium">
              {sender?.name?.charAt(0)?.toUpperCase() || '?'}
            </span>
          )}
        </div>
      </div>
    );
  };

  // Renderizar ações da mensagem
  const renderActions = () => {
    if (!showActions) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="absolute top-0 right-0 transform translate-x-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1 z-10"
      >
        <button
          onClick={() => {
            onReply?.(message);
            setShowActions(false);
          }}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <Reply className="w-4 h-4" />
          <span>Responder</span>
        </button>
        
        <button
          onClick={() => {
            setIsReacting(true);
            setShowActions(false);
          }}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <Heart className="w-4 h-4" />
          <span>Reagir</span>
        </button>
      </motion.div>
    );
  };

  // Renderizar seletor de reações
  const renderReactionPicker = () => {
    if (!isReacting) return null;

    const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="absolute top-0 right-0 transform translate-x-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10"
      >
        <div className="flex space-x-1">
          {reactions.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                onReact?.(message, emoji);
                setIsReacting(false);
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <span className="text-lg">{emoji}</span>
            </button>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        "flex group relative",
        isOwn ? "justify-end" : "justify-start",
        className
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setIsReacting(false);
      }}
    >
      {/* Avatar */}
      {renderAvatar()}

      {/* Container da mensagem */}
      <div className={cn(
        "flex flex-col max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        isOwn ? "items-end" : "items-start"
      )}>
        {/* Nome do remetente */}
        {!isOwn && sender && (
          <div className="mb-1">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {sender.name}
            </span>
          </div>
        )}

        {/* Bolha da mensagem */}
        <div className={cn(
          "relative px-4 py-2 rounded-2xl shadow-sm",
          "transition-all duration-200",
          isOwn 
            ? "bg-primary-500 text-white rounded-br-md" 
            : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md border border-gray-200 dark:border-gray-600",
          "hover:shadow-md"
        )}>
          {/* Conteúdo da mensagem */}
          <div 
            className={cn(
              "text-sm leading-relaxed break-words",
              CHAT_TYPOGRAPHY.fontSize.sm,
              CHAT_TYPOGRAPHY.lineHeight.relaxed
            )}
            style={{ fontFamily: CHAT_TYPOGRAPHY.fontFamily.sans.join(', ') }}
          >
            {message.content}
          </div>

          {/* Anexos */}
          {renderAttachments()}

          {/* Timestamp e status */}
          <div className="flex items-center justify-between mt-1">
            {showTimestamp && (
              <span className={cn(
                "text-xs",
                isOwn ? "text-primary-100" : "text-gray-500 dark:text-gray-400"
              )}>
                {formatTimestamp(message.timestamp)}
              </span>
            )}
            
            {/* Botão de ações */}
            <button
              onClick={() => setShowActions(!showActions)}
              className={cn(
                "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                "p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10",
                isOwn ? "text-primary-100" : "text-gray-500 dark:text-gray-400"
              )}
            >
              <MoreVertical className="w-3 h-3" />
            </button>
          </div>

          {/* Status da mensagem */}
          {renderMessageStatus()}
        </div>

        {/* Reações */}
        {renderReactions()}

        {/* Ações da mensagem */}
        {renderActions()}

        {/* Seletor de reações */}
        {renderReactionPicker()}
      </div>
    </motion.div>
  );
};
