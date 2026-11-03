# Auditoria técnica — evidências e gravidade

Snapshot fixo: `af72b33935d2e8ab3ac17c9f0866b4cca035d575`. Caminhos e linhas abaixo referem-se a esse commit.

P0: bloquear publicação do fluxo afetado; P1: corrigir antes da liberação empresarial; P2: manutenção, experiência e operação. Gravidade é triagem técnica, não laudo de incidente.

## Achados

### F01 · P0 · Next anterior a correções de segurança
Evidência: [apps/web/package.json:26](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/package.json#L26).

O App Router usa Next 15.5.3, anterior às correções documentadas de RSC e ao boletim oficial de 14/10/2026. Isso comprova uma dependência desatualizada, não exploração ou incidente.

Correção e verificação: Aplicar patch suportado antes de exposição pública; analisar advisories e lockfile. Separar patch de segurança da migração major.

### F02 · P0 · Identidade de candidatos não protegida
Evidência: [apps/api/src/candidates/candidates.controller.ts:26](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/api/src/candidates/candidates.controller.ts#L26).

Consulta, atualização e candidaturas recebem e-mail por query; não há guard de identidade no controller nem guard global encontrado. O serviço consulta/atualiza por esse e-mail. Risco de acesso horizontal se a API estiver exposta.

Correção e verificação: Derivar subject da sessão verificada no servidor, autorizar ownership e restringir campos; testes A não lê/altera B.

### F03 · P0 · Login simulado e confiança em localStorage
Evidência: [apps/web/src/components/auth/GoogleLogin.tsx:27](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/components/auth/GoogleLogin.tsx#L27).

Sem client ID ocorre login simulado; outra via apenas decodifica JWT no navegador. Callback também cria usuário fictício ao receber code. Não constitui sessão autenticada no backend.

Correção e verificação: Remover simulação do caminho de produção, validar tokens/code no servidor, emitir sessão segura e testar state/nonce/PKCE conforme fluxo.

### F04 · P0 · Contato reporta sucesso sem entrega
Evidência: [apps/web/src/app/api/contact/route.ts:281](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/app/api/contact/route.ts#L281).

A resposta de sucesso é construída mesmo quando as duas integrações falham. sendEmailNotification apenas registra log e retorna true se EMAIL_SERVICE existe.

Correção e verificação: Persistir/encaminhar com confirmação durável; retornar erro se nada foi aceito; implementar idempotência e reprocessamento.

### F05 · P1 · Rate limit do contato é um stub
Evidência: [apps/web/src/lib/validation.ts:209](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/lib/validation.ts#L209).

A função retorna allowed:true incondicionalmente. A presença da chamada na rota não implementa limitação.

Correção e verificação: Implementar contador atômico compartilhado, janela/TTL e teste de 429 em mais de uma instância.

### F06 · P1 · Throttle Nest sem aplicação comprovada
Evidência: [apps/api/src/app.module.ts:18](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/api/src/app.module.ts#L18).

Configuração ttl:60/limit sem guard encontrado; middleware também não incrementa contador. Verificar API compatível da versão 6; ttl documentado em milissegundos.

Correção e verificação: Configurar binding de ThrottlerGuard e storage coerente; verificar bootstrap e bloquear por teste de abuso.

### F07 · P1 · Middleware continua após responder erro
Evidência: [apps/api/src/middleware/security.middleware.ts:28](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/api/src/middleware/security.middleware.ts#L28).

validateRequest responde 400/413, mas o retorno do método não interrompe use, que chama next().

Correção e verificação: Usar return/exception no fluxo externo; testar que handler não executa após rejeição e que não há resposta dupla.

### F08 · P1 · Validação de DTOs não ativada globalmente
Evidência: [apps/api/src/main.ts:5](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/api/src/main.ts#L5).

Não há ValidationPipe no bootstrap nem uso local encontrado; decorators do DTO não bastam para validar payloads recebidos.

Correção e verificação: Ativar whitelist/forbidNonWhitelisted/transform conforme contratos e DTO específico de update; testes negativos.

### F09 · P1 · Dados originais em log de contato
Evidência: [apps/web/src/app/api/contact/route.ts:169](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/app/api/contact/route.ts#L169).

O objeto entregue ao console.log contém e-mail e telefone originais, apesar do comentário não logar.

Correção e verificação: Eliminar PII dos logs e rastrear por requestId/protocolo; validar com payload sintético.

### F10 · P1 · Consentimento incompatível com GA4
Evidência: [apps/web/src/components/ui/modern-cookie-consent.tsx:83](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/components/ui/modern-cookie-consent.tsx#L83).

Banner ativo grava stark-cookie-consent e evento cookie-consent-updated; GA4 e analytics-unified leem cookie:consent/prefs e escutam cookie:consent.

Correção e verificação: Unificar contrato versionado, migração, revogação e eventos; verificar rede antes/depois de aceitar e rejeitar.

### F11 · P1 · Tokens Tailwind com cores incompletas
Evidência: [apps/web/src/app/globals.css:10](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/app/globals.css#L10).

@theme define valores como 210 100% 60%, canais HSL sem função de cor. Utilitários Tailwind precisam de valor CSS de cor; body envolve em hsl(), utilitários não necessariamente.

Correção e verificação: Usar valores completos hsl()/oklch()/hex, tokens semânticos e verificar computed styles. Não inferir contraste sem renderização.

### F12 · P1 · Tipos React incompatíveis com major runtime
Evidência: [apps/web/package.json:17](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/package.json#L17).

React/React DOM 19 declarados com tipos 18.

Correção e verificação: Alinhar react/react-dom/@types na mesma linha compatível e executar tsc.

### F13 · P1 · Dependência Tailwind em dist-tag móvel
Evidência: [apps/web/package.json:32](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/package.json#L32).

Um install sem lock pode resolver outra versão/canal; não significa que o lock atual mudou sozinho.

Correção e verificação: Substituir dist-tag por versão estável revisada e manter lockfile congelado no CI.

### F14 · P1 · Runtime Docker obsoleto
Evidência: [apps/api/Dockerfile:4](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/api/Dockerfile#L4).

Docker usa Node 18, encerrado segundo tabela oficial. Instala pnpm global sem versão e não demonstra runtime pnpm completo para a API.

Correção e verificação: Node 24 LTS ou 22 por compatibilidade; fixar pnpm e verificar imagem final, symlinks, Prisma e usuário não root.

### F15 · P1 · Canonical raiz herdável nas páginas
Evidência: [apps/web/src/app/layout.tsx:64](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/app/layout.tsx#L64).

Layout aponta canonical para a home; páginas sem override podem herdar URL errada.

Correção e verificação: Gerar metadata e canonical próprio por rota no servidor; crawl do HTML emitido.

### F16 · P1 · Robots restringe recursos e extensões
Evidência: [apps/web/src/app/robots.ts:15](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/app/robots.ts#L15).

Regra geral bloqueia /_next/, *.json e *.xml; regras específicas diferem para Googlebot/Bingbot. Há risco de política inconsistente de crawling, não diagnóstico de desindexação.

Correção e verificação: Simplificar regras, permitir recursos públicos e sitemap; usar auth/noindex conforme objetivo.

### F17 · P1 · lastModified sem relação com publicação
Evidência: [apps/web/src/lib/seo-advanced.tsx:450](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/lib/seo-advanced.tsx#L450).

Sitemap atribui agora a todas as URLs e deriva serviços de keywords; não é inventário canônico de conteúdo.

Correção e verificação: Registro explícito de URLs indexáveis e datas reais de conteúdo; omitir lastmod se desconhecido.

### F18 · P1 · Dados de negócio sem evidência documental
Evidência: [apps/web/src/components/seo/structured-data.tsx:16](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/components/seo/structured-data.tsx#L16).

Schema repete endereço em Organization e LocalBusiness, muda cidade por parâmetro e usa dois domínios de e-mail. Não foi comprovada veracidade do endereço ou presença física.

Correção e verificação: Confirmar NAP e área atendida; não criar endereço físico em cada cidade; IDs estáveis e dados coerentes com página.

### F19 · P1 · Params dinâmicos acessados incorretamente
Evidência: [apps/web/src/app/suporte-tecnico/[cidade]/page.tsx:23](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/app/suporte-tecnico/[cidade]/page.tsx#L23).

Promise é convertida por cast sem resolução, seguida de cidade.toLowerCase(); blog também acessa params.slug diretamente.

Correção e verificação: Resolver params em Server Component async ou API React adequada; teste cidade válida/inválida e blog existente/inexistente.

### F20 · P1 · Artigo ausente não usa notFound
Evidência: [apps/web/src/app/blog/[slug]/page.tsx:18](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/app/blog/[slug]/page.tsx#L18).

Retorna mensagem no componente em vez de notFound(), com risco de soft 404.

Correção e verificação: notFound real e metadata própria; testar status e conteúdo de inexistente.

### F21 · P1 · Assets locais referenciados não versionados
Evidência: [apps/web/src/app/layout.tsx:42](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/app/layout.tsx#L42).

Nenhum arquivo sob apps/web/public no snapshot; OG, apple icon, favicon, fontes e outros paths locais são referenciados. icon.svg via convenção App Router existe.

Correção e verificação: Inventariar assets efetivos, adicionar arquivos aprovados e testar status/MIME/dimensões; não declarar todos os ícones ausentes.

### F22 · P1 · Rotas de frontend/backend não reconciliadas
Evidência: [apps/web/src/services/api.ts:18](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/services/api.ts#L18).

Cliente usa /api/candidates enquanto Nest expõe /candidates; authApi chama rotas não encontradas na árvore; rewrite entre hosts não identificado.

Correção e verificação: Escolher BFF no Next ou URL de API explícita; documentar contrato e testar navegador→servidor→banco.

### F23 · P1 · Chat com operações sem guards visíveis
Evidência: [apps/api/src/chat/chat.controller.ts:30](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/api/src/chat/chat.controller.ts#L30).

Controller expõe operações de usuários/sessões/mensagens; importa UseGuards sem uso encontrado. IDs/protocolos não substituem autorização.

Correção e verificação: Classificar visitante/agente/admin; limitar sessão do visitante; autorizar cada acesso e paginar/listar com escopo.

### F24 · P2 · UI fragmentada e componentes extensos
Evidência: [apps/web/src/components/sections/header/ModernHeader.tsx:95](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/components/sections/header/ModernHeader.tsx#L95).

Header de ~48 KB, footer ~44 KB, página de consultoria ~108 KB; múltiplas famílias de cards, seções, carrosséis e temas. Coexistência é comprovada, código morto exige análise de imports.

Correção e verificação: Mapear uso e consolidar por contrato; remover só após cobertura de consumidores e comparação visual.

### F25 · P1 · CTA da hero apenas registra evento
Evidência: [apps/web/src/components/data/hero-slides.ts:14](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/components/data/hero-slides.ts#L14).

Callbacks das ações comerciais dos slides apenas chamam analytics; HeroEmbla liga esses handlers aos botões.

Correção e verificação: Ação deve navegar/abrir fluxo real; tracking é consequência; teste de destino por slide.

### F26 · P2 · Otimização de performance por mutação tardia
Evidência: [apps/web/src/components/performance/advanced-performance.tsx:29](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/components/performance/advanced-performance.tsx#L29).

Componente global modifica lazy/high priority após render e injeta preloads de assets não encontrados. Mede FID no tipo de métricas.

Correção e verificação: Configurar prioridade no componente que renderiza, remover preloads inexistentes e medir INP/LCP/CLS com ferramenta apropriada.

### F27 · P2 · Health não comprova entrega
Evidência: [apps/web/src/app/api/health/route.ts:122](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/web/src/app/api/health/route.ts#L122).

Contadores são placeholders; email saudável só por configuração. HEAD responde 200 independente do GET.

Correção e verificação: Separar liveness/readiness e diagnóstico protegido; mostrar desconhecido em vez de métrica inventada.

### F28 · P1 · Publicação Vercel não confirmada
Evidência: [vercel.json:3](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/vercel.json#L3).

Arquivo raiz filtra web mas saída assume .next na raiz; guia recomenda root apps/web e menciona arquivo local que não existe no snapshot. Consulta autenticada anterior não encontrou projeto pelo nome ou repo ID na equipe acessível.

Correção e verificação: Escolher uma configuração por app, validar output com Root Directory real e vincular a branch Main. Não concluir inexistência em contas não acessíveis.

### F29 · P2 · Linter e ferramentas fragmentados
Evidência: [apps/api/package.json:15](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/api/package.json#L15).

API lint altera arquivos; raiz tem Biome/Prettier e configurações ESLint em versões distintas; web usa next lint, removido no Next 16.

Correção e verificação: Separar lint/check de fix/format e definir dono de cada regra; alinhar configuração e CI.

### F30 · P2 · Test runner exige compatibilidade verificada
Evidência: [apps/api/package.json:59](https://github.com/fabriciofcastro/stark/blob/af72b33935d2e8ab3ac17c9f0866b4cca035d575/apps/api/package.json#L59).

Jest 30, ts-jest 29 e tipos Jest 30 coexistem. Não foi provado que testes passam.

Correção e verificação: Resolver matriz suportada ou migrar com intenção; rodar testes reais, sem silenciar peer warnings.

## Achados da árvore Git

- 308 arquivos versionados no snapshot; inventário completo em inventario.json.
- `.turbo/daemon/9d97f5dba363a74c-turbo.log.2025-10-04`: 94.628.650 bytes; log de 05/10: 49.208.003 bytes. Soma 143.836.653 bytes (~143,84 MB decimais), além de logs menores. Remover do índice futuro; reescrever histórico exige decisão específica.
- Há `.bak` e `.bak2` do menu, `server.log`, `dist/next.config.dev.js`, dois pnpm-lock.yaml (raiz e API), arquivos de análise intermediária e documentação extensa na raiz.
- Nenhum workflow `.github/workflows` e nenhum AGENTS.md ou LICENSE encontrados na árvore. Não foi lida configuração administrativa de rulesets; ausência de workflow não comprova ausência de toda integração externa.
- Testes encontrados: app.controller.spec.ts e app.e2e-spec.ts na API. Rotas test-chat/test-page não são suíte de testes. Nenhuma suíte automatizada de frontend identificada na árvore.
- BRAND.md existe; não partir da premissa de marca inexistente. Há tokens em CSS, design-tokens.ts, theme-system.ts, stark-typography.ts e chat/design-system.ts; avaliar consumidores antes de eliminar.

## Limites da auditoria

Esta é uma auditoria estática ampla do snapshot, com leitura dos fluxos críticos e inventário da árvore inteira. Não equivale a revisão manual de cada linha, pentest, certificação de acessibilidade ou auditoria visual renderizada. Não foram realizadas requisições ofensivas nem leitura de dados de candidatos.

Não foram confirmados domínio público ativo, DNS, Search Console, CrUX, analytics, contas de serviços, segredos, banco de produção ou headers servidos. Pontuação Lighthouse e contraste não foram inventados. Testes e instalação são relatados em 09-VALIDACAO-E-FONTES.md. A observação anterior da Vercel cobre somente os escopos acessíveis à conexão.

Não classificar documentos com checkmarks como prova de implementação. Ex.: DEPLOY_VERCEL.md anuncia CSP e HSTS, mas vercel.json não contém ambos; a comprovação final exige resposta HTTP do ambiente real.

## Confirmações adicionais da execução

### F31 · P1 · API não compila após geração do Prisma

Após `prisma generate` efetivamente gerar client 5.22.0, `pnpm --filter api build` termina com 77 erros. Exemplos: configuração de Throttler inválida em app.module.ts:19, divergência de CreateAnalyticsDto/schema em chat/analytics.service.ts:15 e interfaces com campos ausentes. A primeira execução tinha 141 erros, parte por ausência do client gerado; o diagnóstico consolidado usa a repetição com geração. Corrigir contratos existentes antes de atribuir tudo a upgrade. Log completo em logs/api-build-after-generate.log.

### F32 · P1 · Canonicals e landmarks incorretos comprovados no HTML

O build produzido contém canonical da home em contact.html e sobre.html. index.html e services.html contêm dois elementos main. Isso confirma saída incorreta nesses templates, além do risco inferido no achado F15. Validar outras páginas por crawl; não generalizar que todas têm o mesmo defeito.
