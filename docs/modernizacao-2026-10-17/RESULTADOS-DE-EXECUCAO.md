# Resultados de execução no snapshot

Snapshot: af72b33935d2e8ab3ac17c9f0866b4cca035d575. Data: 17/10/2026. Runtime local: Node 24.19.0. Package manager executado por Corepack: pnpm 8.15.0. Sem variáveis/credenciais de produção fornecidas.

| Comando | Resultado | Interpretação |
|---|---|---|
| `corepack pnpm@8.15.0 install --frozen-lockfile --ignore-scripts` | PASS, exit 0 | 1.142 pacotes; lock considerado atualizado; scripts de dependências deliberadamente não executados |
| `corepack pnpm@8.15.0 --filter web type-check` | PASS, exit 0 | TypeScript não detectou os problemas semânticos identificados na auditoria |
| `corepack pnpm@8.15.0 --filter web lint` | FAIL, exit 1 | Abre prompt “How would you like to configure ESLint?”; não é gate não interativo funcional |
| `corepack pnpm@8.15.0 --filter web build` | PASS, exit 0 | Next 15.5.3 compila, gera páginas e traces; isso não valida os fluxos sensíveis |
| `corepack pnpm@8.15.0 --filter api test -- --runInBand` | PASS, exit 0 | Uma suíte, um teste: AppController retorna Hello World!; não cobre autenticação, candidatos, contato ou chat |
| `corepack pnpm@8.15.0 --filter api build` | FAIL, exit 1 | Erro TS2353 na configuração Throttler (`ttl` no formato incorreto) e erros Prisma; primeira execução antes de generate explícito |

## HTML e arquivos efetivamente produzidos

Inspeção direta dos arquivos `.next/server/app` após build, sem browser:

- `contact.html`: canonical `https://starksolutions.com.br`, que aponta à home em vez da página.
- `sobre.html`: canonical da home também.
- `services.html`: canonical próprio `/services`, mas dois elementos `<main>`.
- `test-page.html`: gerada como rota pública com canonical da home.
- `robots.txt.body`: confirma as diferenças de regras entre `*`, Googlebot e Bingbot descritas no achado F16.
- `sitemap.xml.body`: confirma lastmod gerado com o instante atual da construção para as URLs.
- CSS emitido: um arquivo de 353.874 bytes sem compressão neste build. Não equivale a bytes transferidos pela rede.
- Home: tabela de build informa First Load JS de 320 kB; shared load próximo de 301 kB. É métrica do relatório Next, não aferição de Lighthouse, tráfego real ou Core Web Vitals.

## Limitações

Não houve navegador, screenshot, Lighthouse, axe, execução de API com banco, envio real de contato, login com conta real, teste de dados pessoais ou deploy. Não foram usados segredos. Testes e2e da API não executados. A inspeção de HTML valida saída estática, não hidratação/interação. O build web bem-sucedido não elimina erro potencial em params dinâmicos que só aparecem ao acessar a rota.

Logs sanitizados acompanham este pacote. Uma tentativa prematura de typecheck retornou `tsc: not found` enquanto instalação ainda estava em andamento; foi repetida após install e passou. Esse evento não foi contado como defeito do repositório.

## Repetição do build da API com client gerado

`corepack pnpm@8.15.0 --filter api exec prisma generate` gerou Prisma Client 5.22.0 com sucesso (mensagem do CLI). O processo de generate concluiu com exit 0, confirmado na consulta final após a compilação. Nenhuma migração ou conexão de banco foi realizada. Depois, `corepack pnpm@8.15.0 --filter api build` ainda falhou, exit 1, agora com **77 erros**. Eles incluem formato inválido de ThrottlerModuleOptions e divergências entre DTOs, interfaces e schema Prisma. Portanto, a falha não é explicada apenas pelo install com ignore-scripts.

A home index.html também contém dois elementos main. Logs completos sanitizados em logs/.
