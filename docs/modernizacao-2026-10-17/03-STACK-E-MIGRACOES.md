# Stack e sequência de migração

Versões atuais abaixo são declarações dos manifests; versões resolvidas devem ser confirmadas pelo lock e listagem instalada. Data-base: 17/10/2026. Alvos são propostas, não atualizações realizadas.

| Item | Atual declarado | Alvo/ação | Risco e validação |
|---|---|---|---|
| Node | Docker 18; raiz sem engines | 24 LTS; 22 LTS como compatibilidade temporária documentada | imagem, Prisma, Nest, Vercel e CI iguais |
| pnpm | 8.15.0 na raiz; Docker sem pin | versão estável exata compatível, única por ambiente | novo lock só em PR específica |
| Turbo | ^1.12.4; pipeline | linha 2 estável compatível, versão resolvida revisada | migrar pipeline→tasks e verificar cache/env |
| Next | 15.5.3 | patch de segurança 15.5.28 como piso do boletim de 14/10; depois 16.4.1 ou patch estável mais recente verificado | sem canary em produção; não usar esse piso como promessa de segurança futura |
| React/DOM | ^19.1.0 | par suportado pelo Next alvo, patches revisados | alinhar tipos 19 e peer deps |
| Tipos React | ^18 | major 19 compatível | tsc e erros de refs/children |
| Tailwind | dist-tag next; plugin ^4.1.14 | linha 4 estável fixa compatível com plugin | corrigir @theme e comparar computed styles |
| TypeScript | versões distintas raiz/web/API | uma linha estável compatível com todos; avaliar >=5.4 se Prisma 7 | não adotar major automaticamente |
| Nest | ^11.0.1 | manter major 11, revisar patches e peers | bootstrap, express 5, validação e testes |
| Prisma/client | ^5.7.1 | atualizar 5→6→7 em etapas compatíveis | ESM, generator, driver adapter e config na v7; backup/restauração antes de migração |
| PostgreSQL | provider postgresql | inventariar versão real e suporte; definir alvo só depois | não é possível concluir versão pelo schema |
| Jest/ts-jest | 30 / 29 | matriz suportada demonstrada | runner, tipos, coverage e e2e |
| ESLint | web 8, API 9 | CLI/config compatíveis com Next alvo | next lint removido na v16; lint não pode corrigir no CI |
| Motion/Embla | framer-motion 11 / Embla 8 | manter se suficiente, atualizar compatibilidade em PR separada | reduzir animações e testar teardown/autoplay |
| Sentry | ^8 | avaliar SDK suportado para Next alvo | source maps privados, sem PII e sourcemap upload comprovado |
| Analytics | GA4, Vercel, wrappers próprios | um contrato e uma montagem por integração | consentimento, revogação, ausência de duplicação |

O boletim oficial de 14/10/2026 informa correções nas linhas 15.5.28 e 16.4.1. O snapshot está abaixo desses pisos. A aplicabilidade de cada falha depende dos recursos e do ambiente; não afirmar exploração. Ler os boletins novamente no início da implementação. Fontes oficiais constam em 09.

## Sequência

1. Registrar baseline e gerar cópia de segurança dos dados que realmente existirem, sem exportar segredos para artefatos.
2. Resolver P0: patch de segurança e desabilitação dos fluxos inseguros enquanto a correção é construída.
3. Fixar Node/pnpm e estabelecer instalação reproduzível no snapshot. Dois lockfiles só devem virar um após comprovar workspace/API.
4. Alinhar React/tipos e Tailwind estável; corrigir tokens antes de redesenhar telas.
5. Migrar lint para CLI independente, separar fix e check.
6. Atualizar Turbo em PR própria; manter resultado de build funcional antes/depois.
7. Migrar Next 15→16: params/searchParams/cookies/headers assíncronos, turbo config, imagens, mudanças de lint, bundler e remoções. A customização webpack atual deve ser removida ou traduzida com benchmark, não carregada cegamente para Turbopack.
8. Atualizar Nest e runner, validando bootstrap antes de migrations de banco.
9. Migrar Prisma em clone de banco com dados sintéticos; CLI e client sempre na mesma versão. Não usar db:reset em ambiente compartilhado ou produção.
10. Atualizar dependências periféricas em pequenos grupos. Rodar análise de advisories com versão e data; triagem de exploitabilidade, não apenas contagem.

## Protocolo de cada PR de upgrade

Registrar versões antiga/nova e fonte; executar instalação congelada, typecheck, lint, build e testes dos fluxos afetados; armazenar log sanitizado; comparar rotas e HTML; validar preview com o mesmo commit; explicar rollback. Mudança de schema usa expand/contract quando houver compatibilidade entre versões simultâneas. Rollback de app não reverte automaticamente banco.

Não misturar major de Next, Prisma, redesign completo e migração de banco em uma PR. Não atualizar por `latest` sem registrar a versão efetiva e revisar o diff de lockfile.
