"use client";

import { ChatWidget } from './chat-widget';
import type { ChatWidgetProps } from './types';

/**
 * ChatProvider - Wrapper client-side para o ChatWidget
 * 
 * Este componente resolve o problema de passar event handlers
 * para Client Components a partir de Server Components.
 */
export const ChatProvider: React.FC<Partial<ChatWidgetProps>> = (props) => {
  return (
    <ChatWidget
      config={{
        theme: 'stark',
        position: 'bottom-right',
        size: 'md',
        autoOpen: false,
        showAvatar: true,
        showTyping: true,
        showStatus: true,
        enableSounds: true,
        enableNotifications: true,
        maxMessages: 50,
        apiEndpoint: '/api/v1/chat',
        websocketEndpoint: '/api/v1/chat/ws',
        ...props.config,
      }}
      onSessionStart={(session) => {
        console.log('Chat session started:', session.id);
        props.onSessionStart?.(session);
      }}
      onSessionEnd={(session) => {
        console.log('Chat session ended:', session.id);
        props.onSessionEnd?.(session);
      }}
      onEscalation={(ticket) => {
        console.log('Escalation ticket created:', ticket.id);
        props.onEscalation?.(ticket);
      }}
      onMessage={props.onMessage}
      className={props.className}
    />
  );
};
