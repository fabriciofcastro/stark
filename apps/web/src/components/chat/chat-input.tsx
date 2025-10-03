"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Paperclip, 
  Image, 
  File, 
  Smile, 
  Mic, 
  MicOff,
  X,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CHAT_TYPOGRAPHY, CHAT_EFFECTS } from './design-system';
import type { ChatInputProps, Attachment } from './types';

/**
 * ChatInput - Componente de entrada de mensagens profissional
 * 
 * Características:
 * - Textarea auto-redimensionável
 * - Suporte a anexos (imagens, arquivos)
 * - Indicador de digitação
 * - Gravação de áudio
 * - Emojis
 * - Validação de entrada
 * - Acessibilidade completa
 */
export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onTyping,
  placeholder = "Digite sua mensagem...",
  disabled = false,
  maxLength = 2000,
  showAttachments = true,
  className,
}) => {
  // Estados
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);

  // Callback de digitação
  const handleTyping = useCallback((isTyping: boolean) => {
    if (onTyping) {
      onTyping(isTyping);
    }

    // Limpar timeout anterior
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (isTyping) {
      // Definir timeout para parar indicador de digitação
      typingTimeoutRef.current = setTimeout(() => {
        onTyping?.(false);
      }, 1000);
    }
  }, [onTyping]);

  // Manipular mudança no texto
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (value.length <= maxLength) {
      setMessage(value);
      adjustTextareaHeight();
      
      // Indicador de digitação
      if (value.trim() && !isComposing) {
        handleTyping(true);
      } else {
        handleTyping(false);
      }
    }
  }, [maxLength, adjustTextareaHeight, handleTyping, isComposing]);

  // Manipular envio de mensagem
  const handleSend = useCallback(() => {
    if (!message.trim() && attachments.length === 0) return;
    if (disabled) return;

    // Enviar mensagem
    onSend(message.trim());
    
    // Limpar estado
    setMessage('');
    setAttachments([]);
    setIsComposing(false);
    handleTyping(false);
    
    // Resetar altura do textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [message, attachments, disabled, onSend, handleTyping]);

  // Manipular teclas
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Manipular composição (para idiomas como japonês)
  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
    if (message.trim()) {
      handleTyping(true);
    }
  }, [message, handleTyping]);

  // Manipular arquivos
  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      metadata: { file },
    }));

    setAttachments(prev => [...prev, ...newAttachments]);
  }, []);

  // Drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  }, [handleFileSelect]);

  // Remover anexo
  const removeAttachment = useCallback((attachmentId: string) => {
    setAttachments(prev => {
      const attachment = prev.find(att => att.id === attachmentId);
      if (attachment?.url.startsWith('blob:')) {
        URL.revokeObjectURL(attachment.url);
      }
      return prev.filter(att => att.id !== attachmentId);
    });
  }, []);

  // Gravação de áudio
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'audio-message.wav', { type: 'audio/wav' });
        
        const audioAttachment: Attachment = {
          id: Date.now().toString(),
          name: 'Mensagem de áudio',
          type: 'audio/wav',
          size: audioBlob.size,
          url: URL.createObjectURL(audioBlob),
          metadata: { file: audioFile },
        };

        setAttachments(prev => [...prev, audioAttachment]);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  // Emojis comuns
  const commonEmojis = ['😊', '😂', '❤️', '👍', '👎', '😮', '😢', '😡', '🎉', '👏'];

  const insertEmoji = useCallback((emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newMessage = message.slice(0, start) + emoji + message.slice(end);
      
      setMessage(newMessage);
      adjustTextareaHeight();
      
      // Focar no textarea e posicionar cursor
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    }
    
    setShowEmojiPicker(false);
  }, [message, adjustTextareaHeight]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      attachments.forEach(attachment => {
        if (attachment.url.startsWith('blob:')) {
          URL.revokeObjectURL(attachment.url);
        }
      });
    };
  }, [attachments]);

  return (
    <div className={cn(
      "relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700",
      className
    )}>
      {/* Anexos */}
      {attachments.length > 0 && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="relative group bg-gray-100 dark:bg-gray-800 rounded-lg p-2 max-w-xs"
              >
                {attachment.type.startsWith('image/') ? (
                  <img
                    src={attachment.url}
                    alt={attachment.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : attachment.type.startsWith('audio/') ? (
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                    <Mic className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <File className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                )}
                
                <button
                  onClick={() => removeAttachment(attachment.id)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
                
                <div className="mt-1">
                  <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                    {attachment.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(attachment.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Picker de emojis */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="grid grid-cols-5 gap-2">
            {commonEmojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => insertEmoji(emoji)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <span className="text-lg">{emoji}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Área principal de input */}
      <div
        className={cn(
          "relative p-4",
          dragOver && "bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-600"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex items-end space-x-3">
          {/* Botões de anexo */}
          {showAttachments && (
            <div className="flex items-center space-x-1">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.zip,.rar"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
              <input
                ref={imageInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Anexar arquivo"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => imageInputRef.current?.click()}
                disabled={disabled}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Anexar imagem"
              >
                <Image className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Textarea */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              className={cn(
                "w-full resize-none rounded-2xl border border-gray-300 dark:border-gray-600",
                "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                "px-4 py-3 pr-12",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "placeholder-gray-500 dark:placeholder-gray-400",
                CHAT_TYPOGRAPHY.fontSize.sm,
                CHAT_TYPOGRAPHY.lineHeight.relaxed,
                "transition-all duration-200"
              )}
              style={{ 
                fontFamily: CHAT_TYPOGRAPHY.fontFamily.sans.join(', '),
                minHeight: '44px',
                maxHeight: '120px',
              }}
              rows={1}
            />
            
            {/* Contador de caracteres */}
            {message.length > maxLength * 0.8 && (
              <div className="absolute bottom-1 right-12 text-xs text-gray-500 dark:text-gray-400">
                {message.length}/{maxLength}
              </div>
            )}
          </div>

          {/* Botões de ação */}
          <div className="flex items-center space-x-1">
            {/* Emoji */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              disabled={disabled}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Adicionar emoji"
            >
              <Smile className="w-5 h-5" />
            </button>

            {/* Gravação de áudio */}
            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onMouseLeave={stopRecording}
              disabled={disabled}
              className={cn(
                "p-2 transition-colors",
                isRecording 
                  ? "text-red-500 hover:text-red-600" 
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              aria-label={isRecording ? "Parar gravação" : "Gravar áudio"}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Enviar */}
            <button
              onClick={handleSend}
              disabled={disabled || (!message.trim() && attachments.length === 0)}
              className={cn(
                "p-2 rounded-full transition-all duration-200",
                "bg-primary-500 hover:bg-primary-600 text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "hover:scale-105 active:scale-95"
              )}
              aria-label="Enviar mensagem"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
