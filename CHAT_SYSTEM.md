# Sistema de Chat Global - STARK

## 📋 Visão Geral

O sistema de chat foi implementado para fornecer uma experiência de primeiro contato excepcional em todas as páginas do site. Ele inclui integração com Chatwoot, WhatsApp, formulário de contato e chatbot inteligente.

## 🚀 Componentes Disponíveis

### 1. GlobalChat
**Localização**: `src/components/global/global-chat.tsx`

Componente principal que é carregado em todas as páginas através do layout principal.

```tsx
import { GlobalChat } from "@/components/global/global-chat";

// Usado automaticamente no layout.tsx
<GlobalChat />
```

### 2. PageChat
**Localização**: `src/components/global/page-chat.tsx`

Componente para páginas específicas que precisam de configurações personalizadas.

```tsx
import { PageChat } from "@/components/global/page-chat";

<PageChat
  pageName="suporte-tecnico"
  customMessage="Olá! Preciso de suporte técnico para minha empresa."
  onContactFormSubmit={(data) => {
    console.log("Dados coletados:", data);
  }}
/>
```

### 3. FloatingChatButton
**Localização**: `src/components/global/floating-chat-button.tsx`

Botão flutuante com menu de opções para páginas específicas.

```tsx
import { FloatingChatButton } from "@/components/global/floating-chat-button";

<FloatingChatButton
  pageName="consultoria-tecnologica"
  customMessage="Olá! Gostaria de uma consultoria tecnológica."
  position="right"
  showOnScroll={true}
  scrollThreshold={200}
/>
```

### 4. useChat Hook
**Localização**: `src/hooks/use-chat.ts`

Hook personalizado para funcionalidades de chat reutilizáveis.

```tsx
import { useChat } from "@/hooks/use-chat";

const { handleContactFormSubmit, openWhatsApp, openChat, getCustomMessage } = useChat({
  pageName: "exemplo",
  customMessage: "Mensagem personalizada",
  onContactFormSubmit: (data) => {
    // Processar dados
  }
});
```

## 🎯 Funcionalidades

### Chatwoot Integration
- ✅ Chat web integrado
- ✅ Configurações personalizáveis
- ✅ Tracking de eventos
- ✅ Atributos customizados

### WhatsApp Widget
- ✅ Widget flutuante
- ✅ Popup informativo
- ✅ Mensagens personalizadas
- ✅ Detecção de scroll

### Smart Chatbot
- ✅ Triagem inteligente
- ✅ Coleta de dados estruturada
- ✅ Fluxo de conversa personalizado
- ✅ Redirecionamento automático

### Formulário de Contato
- ✅ Integração com API
- ✅ Validação inteligente
- ✅ Campos dinâmicos
- ✅ Notificações de sucesso

## 📱 Experiência Mobile

### Barra de Opções Mobile
- ✅ Formulário de contato
- ✅ WhatsApp direto
- ✅ Ligação telefônica
- ✅ Agendamento de reunião

## ⚙️ Configuração

### Variáveis de Ambiente
```env
NEXT_PUBLIC_CHATWOOT_BASE_URL=https://app.chatwoot.com
NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN=seu_token_aqui
NEXT_PUBLIC_WHATSAPP_NUMBER=+5511999999999
```

### Mensagens Personalizadas por Página
```typescript
const pageMessages = {
  "suporte-tecnico": "Olá! Preciso de suporte técnico para minha empresa.",
  "consultoria-tecnologica": "Olá! Gostaria de uma consultoria tecnológica estratégica.",
  "cloud-vps-linux": "Olá! Estou interessado em soluções de nuvem e VPS.",
  "cyberseguranca": "Olá! Preciso de serviços de cibersegurança.",
  "helpdesk": "Olá! Preciso de um help desk para minha empresa.",
  "governance": "Olá! Gostaria de implementar governança de TI.",
  "create-site": "Olá! Preciso criar um site para minha empresa.",
  "contact": "Olá! Gostaria de entrar em contato com a STARK.",
};
```

## 🔧 Uso em Páginas Específicas

### Exemplo 1: Página de Serviços
```tsx
import { PageChat } from "@/components/global/page-chat";

export default function ServicosPage() {
  return (
    <div>
      {/* Conteúdo da página */}
      <h1>Nossos Serviços</h1>
      
      {/* Chat específico da página */}
      <PageChat
        pageName="services"
        customMessage="Olá! Gostaria de conhecer os serviços da STARK."
      />
    </div>
  );
}
```

### Exemplo 2: Página com Botão Flutuante
```tsx
import { FloatingChatButton } from "@/components/global/floating-chat-button";

export default function ContatoPage() {
  return (
    <div>
      {/* Conteúdo da página */}
      <h1>Entre em Contato</h1>
      
      {/* Botão flutuante personalizado */}
      <FloatingChatButton
        pageName="contact"
        position="left"
        showOnScroll={false}
      />
    </div>
  );
}
```

### Exemplo 3: Usando o Hook
```tsx
import { useChat } from "@/hooks/use-chat";

export default function ExemploPage() {
  const { openWhatsApp, handleContactFormSubmit } = useChat({
    pageName: "exemplo",
    customMessage: "Mensagem personalizada para esta página"
  });

  return (
    <div>
      <button onClick={openWhatsApp}>
        Abrir WhatsApp
      </button>
      
      <button onClick={() => handleContactFormSubmit({
        name: "João",
        email: "joao@email.com",
        service: "Suporte"
      })}>
        Enviar Dados
      </button>
    </div>
  );
}
```

## 📊 Analytics e Tracking

### Eventos Rastreados
- `chat_opened` - Chat do Chatwoot aberto
- `chat_closed` - Chat do Chatwoot fechado
- `whatsapp_click` - Clique no WhatsApp
- `form_submit` - Envio de formulário

### Dados Coletados
- Página de origem
- Timestamp da interação
- Dados do usuário (nome, email, telefone)
- Serviço de interesse
- Caminho de navegação

## 🎨 Personalização

### Cores e Estilos
Os componentes usam as classes Tailwind CSS padrão do projeto:
- `brand-gold-500` - Cor principal
- `brand-gold-600` - Cor hover
- `green-500` - WhatsApp
- `blue-500` - Chat

### Animações
- Framer Motion para transições suaves
- Micro-interações em botões
- Animações de entrada/saída
- Efeitos de hover

## 🚀 Performance

### Otimizações
- ✅ Lazy loading de componentes
- ✅ Debounce em eventos de scroll
- ✅ Memoização de callbacks
- ✅ Cleanup de event listeners

### Bundle Size
- GlobalChat: ~15KB
- PageChat: ~12KB
- FloatingChatButton: ~18KB
- useChat Hook: ~8KB

## 🔒 Segurança

### Validações
- ✅ Sanitização de inputs
- ✅ Validação de tipos TypeScript
- ✅ Escape de caracteres especiais
- ✅ Rate limiting na API

### Privacidade
- ✅ Consentimento para cookies
- ✅ Dados criptografados
- ✅ LGPD compliance
- ✅ Retenção de dados controlada

## 📝 Manutenção

### Logs
- Console logs para debugging
- Error tracking integrado
- Performance monitoring
- User interaction analytics

### Updates
- Versionamento semântico
- Changelog detalhado
- Breaking changes documentados
- Migration guides

## 🆘 Troubleshooting

### Problemas Comuns

1. **Chat não aparece**
   - Verificar variáveis de ambiente
   - Confirmar token do Chatwoot
   - Verificar console para erros

2. **WhatsApp não abre**
   - Verificar número formatado
   - Confirmar permissões do navegador
   - Testar em diferentes dispositivos

3. **Formulário não envia**
   - Verificar API endpoint
   - Confirmar validações
   - Verificar network tab

### Debug Mode
```typescript
// Ativar logs detalhados
const { handleContactFormSubmit } = useChat({
  pageName: "debug",
  onContactFormSubmit: (data) => {
    console.log("Debug - Dados coletados:", data);
  }
});
```

## 📞 Suporte

Para dúvidas ou problemas com o sistema de chat:
- Verificar documentação
- Consultar exemplos de uso
- Revisar logs do console
- Contatar equipe de desenvolvimento

---

**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024  
**Mantenedor**: Equipe STARK
