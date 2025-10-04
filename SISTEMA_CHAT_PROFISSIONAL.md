# Sistema de Chat Profissional STARK

## 📋 Visão Geral

Sistema de chat inteligente e profissional desenvolvido do zero para a STARK Gestão em Tecnologia. O sistema foi completamente redesenhado com foco em:

- **Design Profissional**: Interface moderna e responsiva
- **Inteligência Artificial**: IA avançada para respostas contextuais
- **Arquitetura Escalável**: Backend robusto com NestJS e PostgreSQL
- **Experiência do Usuário**: Tipografia otimizada e acessibilidade WCAG AA
- **Integração Completa**: APIs RESTful e WebSocket em tempo real

## 🏗️ Arquitetura do Sistema

### Backend (NestJS + PostgreSQL)

```
apps/api/src/chat/
├── chat.controller.ts      # Controllers RESTful
├── chat.service.ts         # Lógica de negócio principal
├── ai-assistant.service.ts # Serviço de IA
├── notification.service.ts # Sistema de notificações
├── analytics.service.ts    # Análises e métricas
├── chat.module.ts          # Módulo principal
├── dto/                    # Data Transfer Objects
│   └── index.ts
├── enums.ts               # Enums TypeScript
└── interfaces.ts          # Interfaces e tipos
```

### Frontend (React + TypeScript)

```
apps/web/src/components/chat/
├── chat-widget.tsx         # Componente principal
├── message-bubble.tsx      # Bolhas de mensagem
├── chat-input.tsx          # Input de mensagens
├── chat-header.tsx         # Cabeçalho do chat
├── typing-indicator.tsx    # Indicador de digitação
├── suggestions-bar.tsx     # Sugestões rápidas
├── design-system.ts        # Sistema de design
├── types.ts               # Tipos TypeScript
├── hooks/
│   └── use-chat.ts        # Hook personalizado
└── index.ts               # Exports
```

### Banco de Dados (PostgreSQL + Prisma)

```sql
-- Principais tabelas
users                    # Usuários do sistema
chat_sessions           # Sessões de chat
chat_messages           # Mensagens
escalation_tickets      # Tickets de escalação
chat_analytics          # Métricas e análises
notifications           # Sistema de notificações
contact_forms           # Formulários de contato
activity_logs           # Logs de atividade
system_config           # Configurações do sistema
```

## 🎨 Design System

### Cores Profissionais

```typescript
CHAT_COLORS = {
  primary: {
    500: '#e9c949',    // Dourado principal
    600: '#d4a017',    // Dourado STARK
  },
  neutral: {
    50: '#fafafa',     // Fundo claro
    900: '#171717',    // Fundo escuro
  },
  success: { 500: '#22c55e' },
  error: { 500: '#ef4444' },
  warning: { 500: '#f59e0b' },
  info: { 500: '#3b82f6' },
}
```

### Tipografia Otimizada

```typescript
CHAT_TYPOGRAPHY = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code'],
  },
  fontSize: {
    xs: '0.75rem',    // 12px - Texto auxiliar
    sm: '0.875rem',   // 14px - Texto padrão
    base: '1rem',     // 16px - Texto importante
    lg: '1.125rem',   // 18px - Títulos pequenos
    xl: '1.25rem',    // 20px - Títulos médios
  },
  lineHeight: {
    normal: '1.5',     // Altura padrão
    relaxed: '1.625',  // Altura relaxada
  },
}
```

### Espaçamentos e Efeitos

```typescript
CHAT_SPACING = {
  space: {
    2: '0.5rem',      // 8px
    4: '1rem',        // 16px
    6: '1.5rem',      // 24px
    8: '2rem',        // 32px
  },
  sizes: {
    chat: {
      width: { md: '380px', lg: '420px' },
      height: { md: '600px', lg: '700px' },
    },
  },
}

CHAT_EFFECTS = {
  borderRadius: {
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
  },
  boxShadow: {
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    glow: '0 0 20px rgb(212 160 23 / 0.3)',
  },
}
```

## 🤖 Inteligência Artificial

### Processamento de Mensagens

```typescript
// Detecção de intenções
const intents = {
  greeting: ['olá', 'oi', 'bom dia', 'hello'],
  service_inquiry: ['serviço', 'oferece', 'fazem'],
  support: ['suporte', 'problema', 'erro', 'ajuda'],
  consultation: ['consultoria', 'aconselhar'],
  security: ['segurança', 'cibersegurança'],
  escalation: ['humano', 'especialista', 'pessoa'],
}
```

### Base de Conhecimento STARK

```typescript
knowledgeBase = {
  services: {
    'suporte técnico': {
      description: 'Oferecemos suporte técnico completo',
      response: 'Nosso suporte técnico é especializado...',
    },
    'consultoria': {
      description: 'Consultoria estratégica em tecnologia',
      response: 'Nossa consultoria tecnológica ajuda...',
    },
    'cibersegurança': {
      description: 'Proteção completa contra ameaças',
      response: 'Oferecemos soluções completas...',
    },
  }
}
```

### Sugestões Inteligentes

```typescript
const suggestions = {
  greeting: [
    'Preciso de suporte técnico',
    'Quero consultoria',
    'Soluções em nuvem',
    'Cibersegurança',
  ],
  service: [
    'Falar com especialista',
    'Agendar reunião',
    'Enviar proposta',
    'WhatsApp',
  ],
}
```

## 📡 APIs RESTful

### Endpoints Principais

```typescript
// Gestão de Usuários
POST   /api/v1/chat/users              # Criar usuário
PUT    /api/v1/chat/users/:userId      # Atualizar usuário
GET    /api/v1/chat/users/:userId      # Obter usuário

// Gestão de Sessões
POST   /api/v1/chat/sessions           # Criar sessão
PUT    /api/v1/chat/sessions/:id       # Atualizar sessão
GET    /api/v1/chat/sessions/:id       # Obter sessão
GET    /api/v1/chat/sessions           # Listar sessões ativas

// Mensagens
POST   /api/v1/chat/messages           # Enviar mensagem
GET    /api/v1/chat/sessions/:id/messages # Obter mensagens

// Escalação
POST   /api/v1/chat/escalations        # Escalar para humano
PUT    /api/v1/chat/escalations/:id    # Atualizar escalação

// Análises
GET    /api/v1/chat/analytics/dashboard # Dashboard stats
POST   /api/v1/chat/analytics         # Criar análise

// Formulários
POST   /api/v1/chat/contact-forms     # Criar formulário
PUT    /api/v1/chat/contact-forms/:id # Atualizar formulário

// Notificações
GET    /api/v1/chat/notifications/users/:userId # Obter notificações
PUT    /api/v1/chat/notifications/:id/read     # Marcar como lida
```

### Exemplos de Uso

```typescript
// Criar sessão
const session = await fetch('/api/v1/chat/sessions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    context: {
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
    }
  })
});

// Enviar mensagem
const response = await fetch('/api/v1/chat/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sessionId: 'session123',
    content: 'Preciso de ajuda com suporte técnico',
    type: 'text'
  })
});
```

## 🔌 WebSocket em Tempo Real

### Conexão

```typescript
const ws = new WebSocket('/api/v1/chat/ws?sessionId=session123');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch (data.type) {
    case 'message':
      // Nova mensagem recebida
      break;
    case 'typing':
      // Indicador de digitação
      break;
    case 'status':
      // Mudança de status
      break;
    case 'notification':
      // Notificação
      break;
  }
};
```

### Tipos de Eventos

```typescript
interface WebSocketMessage {
  type: 'message' | 'typing' | 'status' | 'notification';
  sessionId: string;
  userId: string;
  data: any;
  timestamp: string;
}
```

## 🎯 Componentes React

### ChatWidget Principal

```tsx
<ChatWidget
  config={{
    theme: 'stark',
    position: 'bottom-right',
    size: 'md',
    autoOpen: false,
    showAvatar: true,
    showTyping: true,
    enableSounds: true,
    maxMessages: 50,
    apiEndpoint: '/api/v1/chat',
    websocketEndpoint: '/api/v1/chat/ws',
  }}
  onSessionStart={(session) => console.log('Started:', session.id)}
  onEscalation={(ticket) => console.log('Escalated:', ticket.id)}
/>
```

### Hook useChat

```tsx
const {
  session,
  messages,
  users,
  isLoading,
  isConnected,
  error,
  sendMessage,
  escalateToHuman,
  reconnect,
} = useChat({
  config: chatConfig,
  onSessionStart: handleSessionStart,
  onEscalation: handleEscalation,
});
```

### Componentes Individuais

```tsx
// Bolha de mensagem
<MessageBubble
  message={message}
  sender={user}
  showAvatar={true}
  showTimestamp={true}
  showStatus={true}
  isOwn={false}
  onReply={handleReply}
  onReact={handleReact}
/>

// Input de chat
<ChatInput
  onSend={handleSend}
  onTyping={handleTyping}
  placeholder="Digite sua mensagem..."
  disabled={false}
  maxLength={2000}
  showAttachments={true}
/>

// Cabeçalho
<ChatHeader
  session={session}
  user={agent}
  onMinimize={handleMinimize}
  onClose={handleClose}
  onEscalate={handleEscalate}
/>
```

## 📊 Analytics e Métricas

### Dashboard Stats

```typescript
interface DashboardStats {
  totalSessions: number;
  activeSessions: number;
  averageResponseTime: number;
  escalationRate: number;
  satisfactionScore: number;
  botAccuracy: number;
  popularIntents: Array<{
    intent: string;
    count: number;
    percentage: number;
  }>;
  hourlyStats: Array<{
    hour: number;
    sessions: number;
    messages: number;
  }>;
}
```

### Métricas de Performance

```typescript
// Tempo de resposta médio
const avgResponseTime = await getAverageResponseTime();

// Taxa de escalação
const escalationRate = (escalations / totalSessions) * 100;

// Satisfação do usuário
const satisfactionScore = await getSatisfactionStats();

// Precisão do bot
const botAccuracy = await getBotAccuracy();
```

## 🔔 Sistema de Notificações

### Tipos de Notificação

```typescript
enum NotificationType {
  MESSAGE = 'message',
  ESCALATION = 'escalation',
  SYSTEM = 'system',
  REMINDER = 'reminder',
}
```

### Canais de Notificação

```typescript
interface NotificationConfig {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
  email: boolean;
  sms: boolean;
  channels: {
    slack?: { webhook: string; channel: string };
    discord?: { webhook: string; channel: string };
    email?: { smtp: any; from: string };
  };
}
```

## 🧪 Testes

### Estrutura de Testes

```
tests/
├── unit/                    # Testes unitários
│   ├── chat.service.test.ts
│   ├── ai-assistant.test.ts
│   └── notification.service.test.ts
├── integration/             # Testes de integração
│   ├── chat-api.test.ts
│   ├── websocket.test.ts
│   └── database.test.ts
└── e2e/                     # Testes end-to-end
    ├── chat-flow.test.ts
    ├── escalation.test.ts
    └── user-journey.test.ts
```

### Exemplo de Teste

```typescript
describe('ChatService', () => {
  it('should create a new session', async () => {
    const session = await chatService.createSession({
      userId: 'user123',
      context: { pageUrl: 'https://stark.com.br' }
    });
    
    expect(session).toBeDefined();
    expect(session.userId).toBe('user123');
    expect(session.status).toBe('active');
  });
});
```

## 🚀 Deploy e Configuração

### Variáveis de Ambiente

```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/stark_chat"

# API
API_PORT=3000
API_HOST=0.0.0.0

# WebSocket
WS_PORT=3001
WS_HOST=0.0.0.0

# Security
JWT_SECRET="your-secret-key"
CORS_ORIGIN="https://stark.com.br"

# AI (futuro)
OPENAI_API_KEY="your-openai-key"
```

### Docker Compose

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: stark_chat
      POSTGRES_USER: stark
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build: ./apps/api
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://stark:password@postgres:5432/stark_chat
    depends_on:
      - postgres

volumes:
  postgres_data:
```

## 📈 Roadmap Futuro

### Fase 1 - Melhorias de IA
- [ ] Integração com OpenAI GPT-4
- [ ] Análise de sentimento avançada
- [ ] Processamento de linguagem natural
- [ ] Aprendizado contínuo

### Fase 2 - Recursos Avançados
- [ ] Chat com voz
- [ ] Tradução automática
- [ ] Integração com CRM
- [ ] Dashboard avançado

### Fase 3 - Escalabilidade
- [ ] Microserviços
- [ ] Cache Redis
- [ ] Load balancing
- [ ] Monitoramento APM

## 🤝 Contribuição

### Padrões de Código

1. **TypeScript**: Tipagem forte em todo o código
2. **ESLint**: Linting automático
3. **Prettier**: Formatação consistente
4. **Husky**: Git hooks para qualidade
5. **Conventional Commits**: Mensagens padronizadas

### Fluxo de Desenvolvimento

```bash
# 1. Criar branch
git checkout -b feature/nova-funcionalidade

# 2. Desenvolver
# ... código ...

# 3. Testar
npm run test
npm run test:e2e

# 4. Commit
git commit -m "feat: adiciona nova funcionalidade de chat"

# 5. Push e PR
git push origin feature/nova-funcionalidade
```

## 📞 Suporte

Para dúvidas ou suporte técnico:

- **Email**: tech@stark.com.br
- **WhatsApp**: +55 11 99999-9999
- **Documentação**: [docs.stark.com.br](https://docs.stark.com.br)

---

**Desenvolvido com ❤️ pela equipe STARK Gestão em Tecnologia**
