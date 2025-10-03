# 🚀 GUIA COMPLETO DE DEPLOY NA VERCEL - STARK TECHNOLOGY

## ✅ ANÁLISE COMPLETA REALIZADA

### **🔍 PROBLEMAS IDENTIFICADOS E CORRIGIDOS:**

#### **1. ✅ Next.js Configuration**
- **❌ Problema**: `outputFileTracingRoot` com caminho absoluto local
- **✅ Solução**: Alterado para caminho relativo `../../`
- **📁 Arquivo**: `apps/web/next.config.js`

#### **2. ✅ Analytics Unificado**
- **❌ Problema**: Dois sistemas GA4 conflitantes
- **✅ Solução**: Sistema unificado com Google Analytics + Vercel Analytics
- **📁 Arquivo**: `apps/web/src/lib/analytics-unified.tsx`

#### **3. ✅ Sentry Integration**
- **❌ Problema**: Configuração sem dependência instalada
- **✅ Solução**: Adicionado `@sentry/nextjs` ao package.json
- **📁 Arquivos**: `sentry.client.config.ts`, `sentry.server.config.ts`

#### **4. ✅ APIs Robustas**
- **❌ Problema**: APIs incompletas e sem tratamento de erro
- **✅ Solução**: Contact API com Chatwoot + Health check detalhado
- **📁 Arquivos**: `apps/web/src/app/api/contact/route.ts`, `apps/web/src/app/api/health/route.ts`

#### **5. ✅ Vercel Configuration**
- **❌ Problema**: Configuração básica sem headers de segurança
- **✅ Solução**: Headers de segurança, CORS, timeouts
- **📁 Arquivo**: `apps/web/vercel.json`

#### **6. ✅ Environment Variables**
- **❌ Problema**: Inconsistências e variáveis faltando
- **✅ Solução**: Exemplo completo organizado por categorias
- **📁 Arquivo**: `apps/web/env.example`

---

## 🚀 PASSO A PASSO PARA DEPLOY NA VERCEL

### **1. 📋 PREPARAÇÃO DO PROJETO**

```bash
# 1. Instalar dependências
cd /home/fabricio/projects/fernando
pnpm install

# 2. Build local para testar
cd apps/web
pnpm build

# 3. Testar localmente
pnpm start
```

### **2. 🌐 CONFIGURAÇÃO NA VERCEL**

#### **A. Conectar Repositório**
1. Acesse [vercel.com](https://vercel.com)
2. Conecte sua conta GitHub
3. Importe o repositório `fernando`

#### **B. Configurações do Projeto**
- **Framework Preset**: Next.js
- **Root Directory**: `apps/web`
- **Build Command**: `cd ../.. && pnpm build --filter=web`
- **Output Directory**: `apps/web/.next`
- **Install Command**: `cd ../.. && pnpm install`

### **3. 🔐 VARIÁVEIS DE AMBIENTE**

Configure as seguintes variáveis no painel da Vercel:

#### **📊 ANALYTICS & MONITORING**
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

#### **💬 CHAT & COMMUNICATION**
```env
NEXT_PUBLIC_CHATWOOT_BASE_URL=https://app.chatwoot.com
NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN=your_chatwoot_website_token
CHATWOOT_ACCESS_TOKEN=your_chatwoot_access_token
CHATWOOT_ACCOUNT_ID=your_chatwoot_account_id
CHATWOOT_INBOX_ID=your_chatwoot_inbox_id
NEXT_PUBLIC_WHATSAPP_NUMBER=+5511994396469
```

#### **📧 EMAIL SERVICES**
```env
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your_email_api_key
NOTIFICATION_EMAIL=contato@starkgestao.com.br
```

#### **🔒 SECURITY**
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
API_SECRET_KEY=your_api_secret_key
```

#### **🌐 SITE CONFIGURATION**
```env
NEXT_PUBLIC_SITE_URL=https://starkgestao.com.br
NEXT_PUBLIC_API_URL=https://api.starksolutions.com.br
NEXT_PUBLIC_MEETING_URL=https://cal.com/stark-tecnologia
```

### **4. 🚀 DEPLOY**

```bash
# Deploy automático via Git
git push origin main

# Ou deploy manual via Vercel CLI
npx vercel --prod
```

### **5. ✅ VERIFICAÇÕES PÓS-DEPLOY**

#### **A. Health Checks**
- **URL**: `https://your-domain.vercel.app/api/health`
- **Detalhado**: `https://your-domain.vercel.app/api/health?detailed=true`

#### **B. Analytics**
- Verificar Google Analytics no console
- Verificar Vercel Analytics no dashboard
- Testar tracking de eventos

#### **C. APIs**
- Testar formulário de contato
- Verificar integração Chatwoot
- Testar reCAPTCHA

#### **D. Performance**
- Lighthouse audit
- Core Web Vitals
- Sentry error tracking

---

## 🔧 CONFIGURAÇÕES AVANÇADAS

### **📊 OBSERVABILIDADE COMPLETA**

#### **Sentry Error Tracking**
- ✅ Configurado para produção
- ✅ Sample rate: 20%
- ✅ Replays habilitados para erros

#### **Vercel Analytics**
- ✅ Automático na Vercel
- ✅ Speed Insights habilitado
- ✅ Web Vitals tracking

#### **Google Analytics 4**
- ✅ Consentimento de cookies
- ✅ Event tracking personalizado
- ✅ E-commerce tracking (se necessário)

### **🛡️ SEGURANÇA**

#### **Headers de Segurança**
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin

#### **CORS**
- ✅ Configurado para APIs
- ✅ Métodos permitidos: GET, POST, PUT, DELETE, OPTIONS

### **⚡ PERFORMANCE**

#### **Function Configuration**
- ✅ Timeout: 30 segundos
- ✅ Memory otimizada
- ✅ Cold start otimizado

#### **Caching**
- ✅ Static assets cached
- ✅ API responses cached quando apropriado

---

## 🎯 CHECKLIST FINAL

### **✅ ANTES DO DEPLOY**
- [ ] Dependências instaladas
- [ ] Build local funcionando
- [ ] Variáveis de ambiente configuradas
- [ ] Testes de API funcionando

### **✅ APÓS O DEPLOY**
- [ ] Site carregando corretamente
- [ ] Analytics funcionando
- [ ] Formulário de contato funcionando
- [ ] Health check respondendo
- [ ] Sentry recebendo dados
- [ ] Performance adequada

### **✅ MONITORAMENTO CONTÍNUO**
- [ ] Sentry alerts configurados
- [ ] Vercel Analytics ativo
- [ ] Google Analytics configurado
- [ ] Uptime monitoring

---

## 🚨 TROUBLESHOOTING

### **❌ Build Falha**
```bash
# Verificar logs
vercel logs

# Build local para debug
cd apps/web
pnpm build
```

### **❌ Analytics Não Funciona**
- Verificar variáveis de ambiente
- Verificar consentimento de cookies
- Verificar console do navegador

### **❌ APIs Não Funcionam**
- Verificar variáveis de ambiente
- Verificar logs da Vercel
- Testar endpoints individualmente

### **❌ Performance Issues**
- Verificar bundle size
- Otimizar imagens
- Verificar Core Web Vitals

---

## 📞 SUPORTE

Para problemas específicos:
1. Verificar logs da Vercel
2. Verificar Sentry para erros
3. Consultar documentação da Vercel
4. Testar localmente primeiro

**🎉 SEU PROJETO ESTÁ PRONTO PARA DEPLOY NA VERCEL!**
