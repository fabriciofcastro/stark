# 🚀 Deploy na Vercel - Guia Completo

## ✅ Verificações Pré-Deploy

### 1. Build Testado
- ✅ Frontend compila sem erros
- ✅ Todas as dependências instaladas
- ✅ TypeScript sem erros
- ✅ Linting passou

### 2. Configurações Vercel
- ✅ `vercel.json` configurado
- ✅ `turbo.json` otimizado
- ✅ Variáveis de ambiente mapeadas
- ✅ Headers de segurança configurados

## 🔧 Configuração na Vercel

### 1. Conectar Repositório
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# Deploy inicial
vercel --prod
```

### 2. Configurar Variáveis de Ambiente
Na dashboard da Vercel, adicione:

```env
# Chatwoot
NEXT_PUBLIC_CHATWOOT_BASE_URL=https://app.chatwoot.com
NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN=seu_token_aqui

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=+5511999999999

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# API (quando backend estiver hospedado)
NEXT_PUBLIC_API_URL=https://sua-api.com
```

### 3. Configurações de Build
- **Framework Preset**: Next.js
- **Root Directory**: `apps/web`
- **Build Command**: `cd ../.. && pnpm build --filter=web`
- **Output Directory**: `.next`
- **Install Command**: `cd ../.. && pnpm install`

## 📁 Estrutura de Arquivos

```
stark-monorepo/
├── vercel.json              # Configuração Vercel
├── turbo.json              # Configuração Turbo
├── pnpm-workspace.yaml     # Workspace pnpm
├── apps/
│   └── web/                # Frontend Next.js
│       ├── vercel.json     # Config específica
│       ├── next.config.js  # Config Next.js
│       ├── package.json    # Dependências
│       └── src/            # Código fonte
└── packages/               # Packages compartilhados
```

## 🛠️ Comandos de Deploy

### Deploy Manual
```bash
# Na raiz do projeto
vercel --prod

# Ou especificando o app
vercel --prod --cwd apps/web
```

### Deploy Automático
- Push para `main` = Deploy automático
- Pull Requests = Preview deployments

## 🔍 Verificações Pós-Deploy

### 1. Funcionalidades
- [ ] Página inicial carrega
- [ ] Navegação funciona
- [ ] Chatbot aparece
- [ ] WhatsApp widget funciona
- [ ] Formulário de contato funciona
- [ ] Chatwoot integrado

### 2. Performance
- [ ] Lighthouse Score > 90
- [ ] Core Web Vitals OK
- [ ] Imagens otimizadas
- [ ] CSS/JS minificados

### 3. SEO
- [ ] Meta tags corretas
- [ ] Sitemap funcionando
- [ ] Robots.txt OK
- [ ] Structured data

## 🐛 Troubleshooting

### Erro: "Module not found"
```bash
# Verificar se todas as dependências estão no package.json
cd apps/web
npm install
```

### Erro: "Build failed"
```bash
# Verificar logs na Vercel
# Verificar se todas as variáveis de ambiente estão configuradas
```

### Erro: "Turbo not found"
```bash
# Instalar Turbo globalmente
npm i -g turbo

# Ou usar pnpm
pnpm add -g turbo
```

## 📊 Monitoramento

### 1. Analytics
- Vercel Analytics habilitado
- Google Analytics configurado
- Core Web Vitals monitorados

### 2. Logs
- Function logs na Vercel
- Error tracking
- Performance monitoring

## 🔒 Segurança

### Headers Configurados
- ✅ Content Security Policy
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Strict-Transport-Security
- ✅ Referrer-Policy

### Variáveis Sensíveis
- ✅ Tokens em variáveis de ambiente
- ✅ Não expostos no código
- ✅ Rotacionados regularmente

## 🚀 Otimizações

### 1. Performance
- ✅ Imagens otimizadas
- ✅ CSS/JS minificados
- ✅ Lazy loading
- ✅ Code splitting

### 2. SEO
- ✅ Meta tags dinâmicas
- ✅ Sitemap automático
- ✅ Structured data
- ✅ Open Graph

## 📱 Mobile

### Responsividade
- ✅ Design responsivo
- ✅ Touch-friendly
- ✅ Mobile-first
- ✅ PWA ready

## 🎯 Próximos Passos

1. **Deploy do Backend**: Hospedar API em Railway/Render
2. **Configurar Domínio**: Adicionar domínio customizado
3. **SSL**: Configurar certificado SSL
4. **CDN**: Configurar CDN global
5. **Monitoring**: Configurar alertas

---

**✅ Frontend pronto para deploy na Vercel!**
