# 🚀 Guia de Deploy - STARK Solutions API no Render.com

## 📋 Pré-requisitos

1. **Conta no Render.com** - [Criar conta](https://render.com)
2. **Banco de dados PostgreSQL** - Recomendado: [Neon](https://neon.tech) ou [Supabase](https://supabase.com)
3. **Variáveis de ambiente** configuradas

## 🔧 Configuração do Banco de Dados

### Opção 1: Neon (Recomendado)
```sql
-- Criar banco de dados
CREATE DATABASE stark_solutions;

-- Criar usuário
CREATE USER stark_user WITH PASSWORD 'sua_senha_super_segura';

-- Conceder permissões
GRANT ALL PRIVILEGES ON DATABASE stark_solutions TO stark_user;
```

### Opção 2: Supabase
1. Criar projeto no Supabase
2. Copiar a connection string
3. Usar como `DATABASE_URL`

## 🌐 Deploy no Render.com

### 1. Conectar Repositório
1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório GitHub
4. Selecione o branch `main`

### 2. Configurar Serviço
```yaml
# Configurações básicas
Name: stark-solutions-api
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: apps/api
```

### 3. Build & Deploy
```bash
# Build Command
cd apps/api && pnpm install && pnpm build

# Start Command
pnpm start:prod

# Health Check Path
/health
```

### 4. Variáveis de Ambiente
Configure as seguintes variáveis no Render:

```env
# Application
NODE_ENV=production
PORT=3001
API_VERSION=v1

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db
DATABASE_SSL=true

# Security
JWT_SECRET=sua_chave_jwt_super_segura_aqui
JWT_EXPIRES_IN=24h
SECURITY_LEVEL=high

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=900000

# CORS
FRONTEND_URL=https://starksolutions.com.br
CORS_ORIGINS=https://starksolutions.com.br,https://www.starksolutions.com.br

# Chatwoot
CHATWOOT_ACCESS_TOKEN=seu_token_chatwoot
CHATWOOT_ACCOUNT_ID=seu_account_id
CHATWOOT_INBOX_ID=seu_inbox_id

# reCAPTCHA
RECAPTCHA_SECRET_KEY=sua_chave_secreta_recaptcha
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=sua_chave_publica_recaptcha

# Email
NOTIFICATION_EMAIL=contato@starksolutions.com.br
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_app
SMTP_SECURE=false

# Logging
LOG_LEVEL=warn
LOG_SENSITIVE_DATA=false

# Render specific
RENDER=true
RENDER_EXTERNAL_URL=https://stark-solutions-api.onrender.com
```

## 🔒 Configurações de Segurança

### 1. Headers de Segurança
O sistema já inclui:
- ✅ Helmet.js para headers de segurança
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ Validação de entrada
- ✅ Detecção de ataques

### 2. Monitoramento
- ✅ Logs de segurança
- ✅ Detecção de padrões suspeitos
- ✅ Rate limiting por IP
- ✅ Validação de requisições

## 📊 Monitoramento e Logs

### 1. Logs do Render
```bash
# Ver logs em tempo real
render logs --service stark-solutions-api
```

### 2. Health Check
```bash
# Verificar saúde da API
curl https://stark-solutions-api.onrender.com/health
```

### 3. Métricas de Segurança
```bash
# Estatísticas de segurança
curl https://stark-solutions-api.onrender.com/api/security/stats
```

## 🚨 Troubleshooting

### Problemas Comuns

#### 1. Build Falha
```bash
# Verificar logs de build
render logs --service stark-solutions-api --type build
```

#### 2. Erro de Conexão com Banco
- Verificar `DATABASE_URL`
- Verificar se o banco aceita conexões externas
- Verificar SSL settings

#### 3. Erro de CORS
- Verificar `CORS_ORIGINS`
- Verificar `FRONTEND_URL`

#### 4. Rate Limiting Muito Restritivo
- Ajustar `RATE_LIMIT_REQUESTS`
- Ajustar `RATE_LIMIT_WINDOW`

### Logs Importantes
```bash
# Logs de segurança
grep "Security Event" logs

# Logs de erro
grep "ERROR" logs

# Logs de performance
grep "Performance" logs
```

## 🔄 CI/CD Pipeline

### 1. Deploy Automático
- ✅ Configurado para branch `main`
- ✅ Deploy automático em push
- ✅ Health check após deploy

### 2. Rollback
```bash
# Rollback para versão anterior
render rollback --service stark-solutions-api
```

## 📈 Performance

### 1. Otimizações Incluídas
- ✅ Compressão gzip
- ✅ Cache de headers
- ✅ Rate limiting inteligente
- ✅ Validação otimizada

### 2. Monitoramento
- ✅ Response time
- ✅ Memory usage
- ✅ Error rate
- ✅ Security events

## 🛡️ Segurança em Produção

### 1. Checklist de Segurança
- ✅ HTTPS obrigatório
- ✅ Headers de segurança
- ✅ Rate limiting ativo
- ✅ Validação rigorosa
- ✅ Logs de auditoria
- ✅ Detecção de ataques

### 2. Backup e Recuperação
- ✅ Backup automático do banco
- ✅ Versionamento de código
- ✅ Rollback rápido

## 📞 Suporte

### 1. Documentação da API
- Swagger UI: `https://stark-solutions-api.onrender.com/api/docs`
- Health Check: `https://stark-solutions-api.onrender.com/health`

### 2. Monitoramento
- Render Dashboard: [dashboard.render.com](https://dashboard.render.com)
- Logs: `render logs --service stark-solutions-api`

### 3. Contato
- Email: contato@starksolutions.com.br
- GitHub: [fabriciofcastro/fernando](https://github.com/fabriciofcastro/fernando)

---

## 🎯 Próximos Passos

1. **Deploy da API** no Render
2. **Configurar domínio** personalizado
3. **Configurar SSL** certificado
4. **Monitoramento** ativo
5. **Backup** automático

---

**✅ Sistema pronto para produção com máxima segurança!**
