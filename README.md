# STARK - Sistema de Chat Inteligente

Sistema completo de chat com IA, integração WhatsApp, Chatwoot e backend NestJS.

## 🚀 Arquitetura

### Frontend (Next.js)
- **Localização**: `apps/web/`
- **Tecnologias**: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Funcionalidades**: Chat inteligente, integração WhatsApp, formulários de contato

### Backend (NestJS)
- **Localização**: `apps/api/`
- **Tecnologias**: NestJS, Prisma, PostgreSQL
- **Funcionalidades**: API de chat, escalação para especialistas, banco de dados

### Monorepo
- **Gerenciador**: Turbo Repo
- **Package Manager**: pnpm
- **Estrutura**: Monorepo com apps e packages compartilhados

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+
- pnpm 8+
- PostgreSQL 14+

### Setup
```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp env.example .env

# Configurar banco de dados
cd apps/api
pnpm prisma generate
pnpm prisma db push

# Iniciar desenvolvimento
pnpm dev
```

## 📱 Funcionalidades

### Chat Inteligente
- ✅ Conversas humanas e naturais
- ✅ Detecção de intenção
- ✅ Escalação para especialistas
- ✅ Coleta de dados estruturada
- ✅ Respostas personalizadas

### Integrações
- ✅ **Chatwoot**: Chat web integrado
- ✅ **WhatsApp**: Widget flutuante
- ✅ **Formulário**: Contato tradicional
- ✅ **Backend**: API completa

### Backend
- ✅ **API REST**: Endpoints para chat
- ✅ **Banco de Dados**: PostgreSQL com Prisma
- ✅ **Escalação**: Sistema de tickets
- ✅ **Notificações**: Slack/Discord

## 🎯 Uso

### Frontend
```bash
cd apps/web
pnpm dev
# http://localhost:3000
```

### Backend
```bash
cd apps/api
pnpm start:dev
# http://localhost:3001
```

### Desenvolvimento Completo
```bash
# Na raiz do projeto
pnpm dev
# Inicia frontend e backend simultaneamente
```

## 🔧 Configuração

### Variáveis de Ambiente
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/stark_chat"

# Chatwoot
NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN="your_token"

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER="+5511999999999"

# API
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### Banco de Dados
```bash
# Gerar cliente Prisma
pnpm prisma generate

# Aplicar migrações
pnpm prisma db push

# Visualizar dados
pnpm prisma studio
```

## 📊 Estrutura do Projeto

```
stark-monorepo/
├── apps/
│   ├── web/                 # Frontend Next.js
│   │   ├── src/
│   │   │   ├── app/         # Páginas Next.js
│   │   │   ├── components/  # Componentes React
│   │   │   └── lib/         # Utilitários
│   │   └── package.json
│   └── api/                 # Backend NestJS
│       ├── src/
│       │   ├── chat/        # Módulo de chat
│       │   ├── prisma/      # Schema do banco
│       │   └── main.ts
│       └── package.json
├── packages/
│   ├── shared/              # Código compartilhado
│   └── ui/                  # Componentes UI
├── turbo.json              # Configuração Turbo
└── package.json            # Root package.json
```

## 🤖 Chat Inteligente

### Características
- **Conversas Naturais**: Respostas humanas e empáticas
- **Detecção de Intenção**: Identifica o que o usuário precisa
- **Escalação Inteligente**: Transfere para especialistas quando necessário
- **Coleta de Dados**: Captura informações estruturadas
- **Contexto**: Mantém contexto da conversa

### Fluxo de Conversa
1. **Saudação**: Cumprimento personalizado
2. **Identificação**: Nome e empresa
3. **Contato**: Email e telefone
4. **Necessidade**: Serviço e urgência
5. **Situação**: Descrição do problema
6. **Ação**: WhatsApp, agendamento, especialista

## 🔄 Escalação para Especialistas

### Quando Escalar
- Perguntas complexas não respondidas
- Solicitação explícita do usuário
- Problemas técnicos específicos
- Urgência alta

### Processo
1. **Detecção**: Sistema identifica necessidade
2. **Ticket**: Cria ticket de escalação
3. **Notificação**: Alerta especialistas
4. **Transferência**: Conecta usuário e especialista

## 📈 Analytics e Tracking

### Eventos Rastreados
- `chat_opened` - Chat iniciado
- `message_sent` - Mensagem enviada
- `escalation_created` - Escalação criada
- `contact_form_submitted` - Formulário enviado

### Métricas
- Taxa de conversão
- Tempo de resposta
- Satisfação do usuário
- Efetividade da escalação

## 🚀 Deploy

### Frontend (Vercel)
```bash
# Build
pnpm build --filter=web

# Deploy
vercel --prod
```

### Backend (Railway/Render)
```bash
# Build
pnpm build --filter=api

# Deploy
# Configurar variáveis de ambiente
# Conectar banco de dados
```

## 🛡️ Segurança

### Medidas Implementadas
- ✅ Validação de dados
- ✅ Sanitização de inputs
- ✅ Rate limiting
- ✅ CORS configurado
- ✅ Headers de segurança

### Privacidade
- ✅ LGPD compliance
- ✅ Dados criptografados
- ✅ Retenção controlada
- ✅ Consentimento explícito

## 📝 Desenvolvimento

### Scripts Úteis
```bash
# Desenvolvimento
pnpm dev

# Build
pnpm build

# Lint
pnpm lint

# Testes
pnpm test

# Limpeza
pnpm clean
```

### Estrutura de Commits
```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: manutenção
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Entre em contato via WhatsApp
- Envie um email para contato@stark.com.br

---

**Desenvolvido com ❤️ pela equipe STARK**