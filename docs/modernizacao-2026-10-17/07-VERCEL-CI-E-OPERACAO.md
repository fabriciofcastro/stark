# Vercel, CI e operação

Situação observada em consulta autenticada de 17/10/2026: projeto não encontrado por nome stark ou repo ID 1070207918 no escopo padrão e na equipe Fabriciocastro acessível. Isso não prova ausência em outra conta. Este pacote não criou projeto, não configurou domínio e não executou deploy.

## Modelo proposto

Vercel para `apps/web` (Next). API Nest e PostgreSQL separados se continuarem necessários; provedor/versão/conta a decidir. Não copiar o backend Nest diretamente para Functions esperando equivalência sem projeto específico. Escolher BFF ou chamada à API por contrato, com origem, sessão, cookies e CORS definidos.

Ambientes: local com dados sintéticos; preview isolado sem credenciais/dados de produção; produção com domínio e dados reais após validação. Banco de preview separado, sem migrations de PR sobre banco de produção. Marcar feature flags para carreiras/chat conforme prontidão do backend.

## Configuração Vercel a validar

| Campo | Proposta |
|---|---|
| Git repository | fabriciofcastro/stark |
| Production branch | Main, respeitando maiúscula |
| Root Directory | apps/web |
| Framework | Next.js |
| Node | mesma linha LTS validada no CI |
| Instalação | pnpm da versão fixada, workspace root detectado; frozen lockfile |
| Build | comando do app, `pnpm build` a partir de apps/web, ou padrão detectado validado |
| Output | padrão Next relativo ao app (.next), não dist de API |
| Config por app | consolidar no diretório efetivo; remover conflito da raiz por PR revisada |
| Preview | proteção de acesso quando necessária e noindex verificado |
| Produção | hostname oficial e HTTPS validados |

Os comandos são proposta inicial e devem ser demonstrados em build limpo da configuração escolhida. Se o provedor executar install na raiz, não inserir cd ../.. por reflexo. Não há chave rootDirectory válida para resolver isso em vercel.json; é configuração do projeto. Para múltiplos apps, projetos distintos e roots específicos.

## Variáveis — categorias sem valores secretos

Publicáveis: NEXT_PUBLIC_SITE_URL (origem oficial), contato/WhatsApp, ID de analytics se adotado, site key captcha, client ID OAuth e URL de reunião apenas se reais. Server-only: DATABASE_URL, credenciais Chatwoot, e-mail, captcha secret e credenciais OAuth/session. Publicar uma variável NEXT_PUBLIC incorpora seu valor ao bundle; mudança pode exigir novo build. Centralizar schema de ambiente e falhar cedo quando um recurso habilitado não tiver configuração. Não exigir configuração de feature desabilitada para todo build.

Não inventar valores, IDs de projeto ou tokens. Não recuperar/imprimir secrets para auditoria. Exemplo de env deve listar propósito, ambiente, owner e obrigatoriedade condicional, nunca credencial real.

## CI mínimo

PR e branch base: checkout, runtime/package manager fixados, instalação congelada, lint sem fix, typecheck por app, build web/API, testes unitários e integração críticos, crawl SEO/assets e acessibilidade automatizada dos templates. Scan de secrets e advisories com política de exceção datada. Timeout e permissões mínimas. Não duplicar deployment Git Vercel e deployment via CLI sem necessidade; CI valida e integração Git constrói previews.

Gates de release dependem do escopo habilitado. Não marcar API/carreiras como PASS se testes foram pulados por falta de banco. Rotas públicas seguras podem ser publicadas com feature indisponível apenas se desabilitação server-side e mensagens corretas forem comprovadas.

## Runbook de release

1. Confirmar equipe, projeto, commit, branch e ambiente. Conferir árvore limpa e PR validada.
2. Validar preview do commit: navegação, menu, contato real sintético, status, metadata, OG e consentimento.
3. Preparar build de produção com env de produção; não presumir que promover preview mantém os mesmos valores de build.
4. Quando houver migração, fazer backup e dry-run; aplicar somente migração compatível revisada. Nunca db:reset.
5. Fazer staging de produção se aplicável, testar build e promover; registrar deployment ID/URL/commit e instante.
6. Testar domínio/HTTPS, host redirect, robots/sitemap/canonical, 404 e receipt de contato. Conferir logs de erro sanitizados.
7. Monitorar imediatamente e depois em 24 h e 7 dias: entrega de leads, erros, indexação e performance; intervalos são tarefas operacionais, não automações criadas por este pacote.

## Rollback e recuperação

Guardar referência do último deployment validado. Rollback do app via plataforma ao estado conhecido; conferir se atribuição automática de domínios ficou desativada e restaurar fluxo de releases conforme documentação. Verificar incompatibilidade de schema/env antes de retornar versão antiga. Banco usa plano separado; não aplicar migration reversa destrutiva sem ensaio. Testar contato e autenticação após rollback. Incidente recebe causa, alcance e evidência.

Liveness deve indicar processo capaz de responder; readiness verifica dependências obrigatórias da feature. Serviços opcionais não podem derrubar health do site inteiro por ausência de env. Diagnóstico detalhado não deve expor métricas internas ou PII em endpoint público. Remover contadores fictícios; unknown é um estado legítimo.
