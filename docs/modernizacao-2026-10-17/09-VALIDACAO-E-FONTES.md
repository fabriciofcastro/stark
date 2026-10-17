# Validação e fontes

## O que foi efetivamente inspecionado

Clone e árvore Git completa do commit auditado; manifests raiz/web/API; configuração Next/Turbo/Vercel/Docker; layout, home e rotas dinâmicas; sitemap/robots/SEO; contatos, consentimento e analytics; candidatos, chat controller, bootstrap/middleware e schema Prisma; componentes hero/header e fontes de design. Documentos antigos foram tratados como alegações a confrontar com código. Referências exatas nos 32 achados.

## Resultado de execução

Os resultados reais dos comandos estão em RESULTADOS-DE-EXECUCAO.md. Instalação foi solicitada com pnpm 8.15.0 e --frozen-lockfile --ignore-scripts: scripts de dependências não foram executados. Isso não equivale a validar geração Prisma ou ciclo de instalação completo. Um typecheck tentado antes do fim da instalação retornou tsc:not found; essa tentativa é limitação de ambiente e não diagnóstico do código. Os checks foram repetidos após a instalação.

Sem servidor funcional aprovado, a auditoria visual, E2E no navegador, Lighthouse, axe e medições de campo ficam NOT_RUN. Não é correto converter build estático ou typecheck em garantia de experiência.

## Matriz de verificação para a implementação

| Área | Caso mínimo | Critério |
|---|---|---|
| Instalação | clone limpo + frozen lock | sem mudança de lock nem dependência ausente |
| Types/lint | web e API | zero erro, sem prompt e sem fix implícito |
| Build | web/API e imagem API | saída reproduzível e runtime inicializa |
| Contato | válido, inválido, duplicado, timeout e destino falha | protocolo só após aceite; erro verdadeiro; sem PII em log |
| Segurança | anônimo, A→A, A→B e agente/admin | autorização no servidor e ausência de mass assignment |
| Antiabuso | repetição concorrente/multi-instância | 429 real e janela correta |
| Consentimento | aceitar, recusar, granular, revogar e reload | contrato consistente e requests/eventos compatíveis |
| Rotas | cada entrada e inexistente dinâmica | 200/404/redirect deliberados; sem soft 404 |
| SEO | HTML inicial, canonical, sitemap, robots, OG e schema | únicos/coerentes, sem assets ausentes e sem dados fictícios |
| UI | menu, formulário, drawer, accordion e carrossel | teclado, toque, foco e reduced-motion |
| Reflow | viewports da spec, zoom e paisagem | sem corte/overflow/foco coberto |
| Acessibilidade | axe + revisão manual WCAG 2.2 AA | sem falha crítica, journeys completos |
| Performance | rotas críticas em laboratório e campo | metas da spec; ausência de campo explicitada |
| Release | preview e produção do commit correto | env, domínio, integrações, logs e rollback conferidos |

## Fontes oficiais consultadas em 17/10/2026

O conteúdo destes links pode mudar. Revalidar antes de executar uma migração. Versões exatas instaladas e advisories devem ser capturados na evidência da PR.

- Código auditado: https://github.com/fabriciofcastro/stark/tree/af72b33935d2e8ab3ac17c9f0866b4cca035d575
- Next 16, migração e mudanças de params, config e lint: https://nextjs.org/docs/app/guides/upgrading/version-16
- Política de suporte Next: https://nextjs.org/support-policy
- Boletim Next de 14/10/2026 e pisos corrigidos 15.5.28/16.4.1: https://nextjs.org/blog/nextjs-security-update-october-14-2026
- Advisory RSC de dezembro/2025, anterior ao snapshot dependente: https://nextjs.org/blog/CVE-2025-66478
- Node, tabela de status das linhas: https://nodejs.org/pt-br/about/previous-releases
- Prisma 7, ESM e breaking changes: https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7
- Nest rate limiting, binding do guard e TTL em ms: https://docs.nestjs.com/security/rate-limiting
- Tailwind theme e cores válidas: https://tailwindcss.com/docs/theme
- Google SEO: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google para desenvolvedores, indexação e JavaScript: https://developers.google.com/search/docs/fundamentals/get-started-developers
- Google Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals

Referências operacionais fornecidas pela skill Vercel deployments-cicd, usadas como orientação e a validar durante implementação:

- https://vercel.com/docs/deployments
- https://vercel.com/docs/git
- https://vercel.com/docs/deployment-checks
- https://vercel.com/docs/deployments/promoting-a-deployment

## Definição de concluído do programa

Nenhum P0 aberto em feature habilitada; build/types/lint/testes executados e aprovados; fluxos reais confirmados; dados comerciais verdadeiros; UI validada nos viewports; SEO em HTML e respostas HTTP verificado; acessibilidade manual e automática registradas; produção/rollback ensaiados; responsável por monitoramento e backlog residual definidos. Documento escrito não conclui implementação.
