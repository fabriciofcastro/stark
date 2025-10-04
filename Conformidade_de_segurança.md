# Conformidade de Segurança

Relatório de conformidade de segurança revisado com base no estado atual do código. Este documento corrige formatação, gramática, referências de arquivos e atualiza o status de cada item com recomendações acionáveis.

Legenda de status: 
- Aberto: requer correção
- Parcialmente mitigado: há mitigação, mas ainda requer ajustes
- Resolvido: risco endereçado adequadamente

---

## 1) Risco de personificação do bot (senderId)
- Status: Parcialmente mitigado
- Impacto: Alto
- Arquivos afetados:
  - apps/api/src/chat/chat.service.ts

Descrição:
- Em sendMessage o ID do bot é seguro, usando um identificador interno fixo (stark-ai-assistant) e há criação/garantia do usuário bot.
- Em sendWelcomeMessage, porém, a mensagem ainda é criada com senderId literal 'bot', o que pode permitir falsificação se partes do sistema confiarem nesse valor textual.

Evidência:
```typescript
// apps/api/src/chat/chat.service.ts
private async sendWelcomeMessage(sessionId: string) {
  const botConfig = await this.getBotConfigPublic();
  await this.prisma.chatMessage.create({
    data: {
      sessionId,
      senderId: 'bot', // <-- usar ID interno seguro
      content: botConfig.welcomeMessage,
      type: MessageType.TEXT,
      status: MessageStatus.SENT,
      metadata: { aiGenerated: true, intent: 'greeting' },
    },
  });
}
```

Ação corretiva recomendada:
- Padronizar o uso do ID seguro do bot em toda a base (ex.: this.BOT_USER_ID = 'stark-ai-assistant').
- Substituir senderId: 'bot' por senderId: this.BOT_USER_ID em sendWelcomeMessage e revisar outros pontos similares.
- Opcional: adicionar verificação referencial (FK) de senderId -> tabela de usuários, evitando qualquer valor livre.

---

## 2) Proteção contra bots (reCAPTCHA)
- Status: Resolvido
- Impacto: Alto
- Arquivos afetados:
  - apps/web/src/app/api/contact/route.ts

Descrição:
- A verificação do reCAPTCHA agora é obrigatória quando configurada. Se segredos não estiverem presentes ou token ausente, a requisição é rejeitada de forma segura. Também há tratamento de erros e logging adequado.

Evidência:
```typescript
// apps/web/src/app/api/contact/route.ts
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!secret || !siteKey) { /* rejeita por segurança */ return false; }
  if (!token) { /* rejeita por segurança */ return false; }
  // Chamada segura à API do reCAPTCHA...
}
```

Ações adicionais (melhoria):
- Tornar a pontuação mínima configurável (ex.: variável de ambiente RECAPTCHA_MIN_SCORE, padrão 0.5).
- Registrar métricas agregadas (sem PII) para observabilidade.

---

## 3) Exposição de dados sensíveis (integração Chatwoot)
- Status: Parcialmente mitigado
- Impacto: Alto
- Arquivos afetados:
  - apps/web/src/app/api/contact/route.ts

Descrição:
- O envio ao Chatwoot aplica mascaramento de nome/email/telefone e sanitização de mensagem. Contudo, os campos originais (original_email, original_phone) ainda são incluídos em custom_attributes, o que envia PII diretamente a um serviço de terceiro.

Evidência:
```typescript
// apps/web/src/app/api/contact/route.ts
contact: {
  name: maskName(payload.name),
  email: maskEmail(payload.email),
  phone_number: maskPhone(payload.phone),
  custom_attributes: {
    company: payload.company || "",
    service: payload.service,
    original_email: payload.email,   // <-- PII enviada ao terceiro
    original_phone: payload.phone,   // <-- PII enviada ao terceiro
  },
},
```

Ação corretiva recomendada:
- Remover original_email e original_phone do payload enviado ao Chatwoot. Se a informação for necessária internamente, armazenar em banco próprio (criptografado/hasheado conforme necessidade) e referenciar via ID.
- Garantir que logs e eventos de observabilidade nunca incluam PII não mascarada.

---

## 4) Atualizações de configuração inseguras (SystemConfig)
- Status: Resolvido (no service) / Aberto (no controller)
- Impacto: Alto
- Arquivos afetados:
  - apps/api/src/chat/chat.service.ts
  - apps/api/src/chat/chat.controller.ts

Descrição:
- O service agora aplica whitelist de chaves permitidas e validação de valores antes do upsert, mitigando o risco de inserção arbitrária de config.
- O controller ainda aceita any no corpo do updateSystemConfig, sem DTO dedicado e sem guarda de autenticação/autorização evidenciado neste ponto do código.

Evidência (service com validação):
```typescript
// apps/api/src/chat/chat.service.ts
private readonly ALLOWED_CONFIG_KEYS = [ 'bot.name', 'bot.welcome_message', /* ... */ ];
private validateConfigKey(key: string): boolean { return this.ALLOWED_CONFIG_KEYS.includes(key); }
private validateConfigValue(key: string, value: any): boolean { /* validações por chave */ }
async updateSystemConfig(config: Record<string, any>) { /* valida chaves e valores antes do upsert */ }
```

Ação corretiva recomendada (controller):
- Alterar assinatura para usar DTO: UpdateSystemConfigDto.
- Aplicar guardas de autenticação/autorização (ex.: JwtAuthGuard + RBAC) na rota de configuração.

Sugestão (controller):
```diff
// apps/api/src/chat/chat.controller.ts
- @Put('config')
- async updateSystemConfig(@Body() config: any) {
-   return this.chatService.updateSystemConfig(config);
- }
+ @Put('config')
+ async updateSystemConfig(@Body() updateSystemConfigDto: UpdateSystemConfigDto) {
+   return this.chatService.updateSystemConfig(updateSystemConfigDto as any);
+ }
```

---

## 5) Confiando em metadados de cliente (analytics: processingTime)
- Status: Aberto
- Impacto: Médio
- Arquivos afetados:
  - apps/api/src/chat/analytics.service.ts
  - apps/api/src/chat/chat.service.ts (origem dos metadados em mensagens)

Descrição:
- O tempo médio de resposta é calculado a partir de chatMessage.metadata.processingTime. Se o cliente puder definir metadados de mensagens, isso pode permitir manipulação de métricas.
- Atualmente, o bot não grava processingTime no metadata do chatMessage; o valor vem do objeto de resposta da IA, mas não é persistido no metadata. Ainda assim, a consulta considera qualquer mensagem com metadata.processingTime.

Evidência:
```typescript
// apps/api/src/chat/analytics.service.ts
const responseTimes = await this.prisma.chatMessage.findMany({
  where: { metadata: { path: ['processingTime'], not: null } },
  select: { metadata: true },
});
```

Ação corretiva recomendada:
- Calcular processingTime no servidor com base em timestamps (diferença entre mensagem do usuário e resposta do bot), e armazenar de forma server-only.
- Bloquear/normalizar metadata enviado pelo cliente (ex.: whitelisting/remoção de campos sensíveis) antes de persistir.
- Alternativamente, mover métricas para tabela dedicada (chatAnalytics), populada apenas por processos do servidor.

---

## 6) Validação de resposta da API no frontend (schema)
- Status: Aberto
- Impacto: Médio
- Arquivos afetados:
  - apps/web/src/components/chat/hooks/use-chat.ts

Descrição:
- O hook assume a presença de success e data no corpo da resposta, sem validação de esquema em runtime. Em conjunto com a renderização direta de conteúdos não saneados em outro ponto, isso pode abrir margem para comportamentos inesperados.

Evidência:
```typescript
// apps/web/src/components/chat/hooks/use-chat.ts
const data = await response.json();
if (!data.success) { throw new Error(data.error || 'Erro na API'); }
return data.data;
```

Ação corretiva recomendada:
- Validar a resposta com schema runtime (ex.: Zod/Valibot) antes de usar.
- Garantir sanitização/escape na renderização de conteúdo vindo do backend.

---

## 7) Verificação de confiança de ativos (manifest)
- Status: Observação (sem vulnerabilidade direta)
- Impacto: Baixo
- Arquivos afetados:
  - apps/web/src/app/manifest.ts

Descrição:
- Conferir que theme_color, scope e ícones referenciam ativos confiáveis e estão alinhados com CSP/PWA.

---

## 8) Relatar corretamente indisponibilidade do serviço (Health Chatwoot)
- Status: Aberto
- Impacto: Médio
- Arquivos afetados:
  - apps/web/src/app/api/health/route.ts

Descrição:
- No health check do Chatwoot, erros de rede devem ser considerados "unhealthy" e não apenas "degraded", para refletir indisponibilidade real.

Evidência:
```typescript
// apps/web/src/app/api/health/route.ts
catch (error) {
  console.error('Chatwoot health check failed:', error);
  return 'degraded'; // <-- recomendado: 'unhealthy'
}
```

Ação corretiva recomendada:
```diff
- return 'degraded';
+ return 'unhealthy';
```

---

## 9) Segurança ao marcar notificação como lida (IDOR)
- Status: Aberto
- Impacto: Alto
- Arquivos afetados:
  - apps/api/src/chat/chat.controller.ts

Descrição:
- A rota aceita userId via corpo da requisição para marcar notificações como lidas, o que permite IDOR se um usuário fornecer o ID de outro.

Evidência:
```typescript
// apps/api/src/chat/chat.controller.ts
@Put('notifications/:notificationId/read')
@HttpCode(HttpStatus.NO_CONTENT)
async markNotificationAsRead(
  @Param('notificationId') notificationId: string,
  @Body('userId') userId: string,
) {
  return this.chatService.markNotificationAsRead(notificationId, userId);
}
```

Ação corretiva recomendada:
- Usar usuário autenticado da sessão/token em vez de aceitar userId do corpo.
- Aplicar guardas (ex.: JwtAuthGuard) e um decorator @User para obter o ID do usuário autenticado.

---

## 10) Validação do número de telefone (formulário de contato)
- Status: Aberto
- Impacto: Baixo
- Arquivos afetados:
  - apps/web/src/app/api/contact/route.ts

Descrição:
- A validação atual permite qualquer número com 10 ou mais dígitos; o ideal é restringir a 10 ou 11 dígitos (formatos BR usuais).

Evidência:
```typescript
// apps/web/src/app/api/contact/route.ts
const phoneDigits = phone?.replace(/\D/g, '') || '';
if (phoneDigits.length < 10) {
  return createErrorResponse('Telefone inválido');
}
```

Ação corretiva recomendada:
```diff
- if (phoneDigits.length < 10) {
-   return createErrorResponse('Telefone inválido');
- }
+ if (phoneDigits.length < 10 || phoneDigits.length > 11) {
+   return createErrorResponse('Telefone inválido. Use o formato (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX.');
+ }
```

---

## 11) Propagação de erros ao obter configurações do sistema
- Status: Aberto
- Impacto: Médio
- Arquivos afetados:
  - apps/api/src/chat/chat.service.ts

Descrição:
- Em caso de falha ao buscar configurações, o método retorna {} silenciosamente. Isso pode mascarar falhas e causar comportamentos inesperados em upstream.

Evidência:
```typescript
// apps/api/src/chat/chat.service.ts
async getSystemConfig() {
  try {
    const configs = await this.prisma.systemConfig.findMany();
    return configs.reduce((acc, config) => { acc[config.key] = config.value; return acc; }, {} as Record<string, any>);
  } catch (error) {
    this.logger.error('Error getting system config:', error);
    return {}; // <-- ideal: propagar erro
  }
}
```

Ação corretiva recomendada:
```diff
- this.logger.error('Error getting system config:', error);
- return {};
+ this.logger.error('Error getting system config:', error);
+ throw error;
```

---

# Sumário de Ações Prioritárias
1) Substituir senderId 'bot' por ID interno seguro no sendWelcomeMessage (Alto).
2) Remover PII original do payload enviado ao Chatwoot (Alto).
3) Proteger rota de notificações contra IDOR usando usuário autenticado (Alto).
4) Aplicar DTO/validação e guarda no updateSystemConfig do controller (Alto).
5) Ajustar health check do Chatwoot para marcar erros de rede como "unhealthy" (Médio).
6) Propagar erros em getSystemConfig (Médio).
7) Fortalecer validação do telefone (Baixo).
8) Validar esquema das respostas no useChat e garantir sanitização na renderização (Médio).
9) Calcular métricas de performance no servidor, evitando metadados controlados pelo cliente (Médio).

---

Este relatório reflete o estado do projeto nos diretórios apps/api e apps/web e substitui versões anteriores com referências inconsistentes. Todos os caminhos e evidências foram verificados no código atual.