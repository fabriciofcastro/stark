# Repositório profissional e arquitetura proposta

## Estratégia

Manter monorepo pnpm + Turborepo se web e API continuarem com ciclos compartilhados. Não criar pacotes vazios para aparentar arquitetura. A API Nest existente deve permanecer separada do runtime Next enquanto sustentar candidatos/chat próprios. PostgreSQL é detalhe real do schema, mas versão do servidor e migrações implantadas não foram verificadas.

Estrutura desejada:

```text
apps/web/src/app/              rotas, layouts e metadata no servidor
apps/web/src/components/ui/    primitivas visuais canônicas
apps/web/src/features/         services, contact, careers, support
apps/web/src/content/          conteúdo tipado, validado e versionado
apps/web/src/lib/              site, SEO, analytics, segurança de servidor
apps/api/src/modules/          módulos funcionais existentes migrados aos poucos
apps/api/prisma/               schema e migrações revisadas
packages/                     somente contratos ou configurações realmente compartilhados
docs/architecture/            decisões ADR e contratos
docs/design/                  tokens, componentes, templates e QA
docs/seo/                     URLs, conteúdo e validações
docs/runbooks/                dev, release, rollback, incidentes e recuperação
docs/evidence/                comando, commit e resultado por entrega
.github/                      CI e templates
```

Não mover todos os diretórios simultaneamente. Resolver primeiro caminhos, aliases e consumers; manter imports públicos de feature. Extrair pacotes compartilhados quando pelo menos dois consumidores justificarem, sem dependências cíclicas web→API→web.

## Responsabilidades

| Camada | Faz | Limite |
|---|---|---|
| App Router | Composição de página, metadata, status HTTP | Sem conteúdo comercial duplicado em grandes componentes |
| UI | Estados, semântica, tokens e interação reutilizável | Sem domínio, integrações ou dados de negócio |
| Feature | Caso de uso e UI específica | Não acessa banco diretamente pelo navegador |
| BFF Next, se escolhido | Sessão, validação e encaminhamento server-side | Não replica regras de candidatos/chat |
| Nest | Autorização, casos de uso, persistência e integrações próprias | Não aceita identidade informada pelo cliente como autoridade |
| Conteúdo | Dados de serviços, cases, autores e URLs | Nenhum depoimento/certificação sem origem validada |

## Governança mínima

Criar AGENTS.md com ordem de leitura, escopo autorizado, comandos reais e regra de evidência. Não criar dezenas de instruções redundantes para agentes. README deve permitir subir ambiente limpo sem recorrer à memória de uma pessoa. CONTRIBUTING descreve branch/PR/commits; SECURITY descreve canal de relato; política de licença deve refletir a titularidade, não ser escolhida automaticamente.

Uma branch por objetivo/wave; nascer da branch base atualizada e árvore limpa. Não renomear `Main` para `main` nesta etapa: validar referências de integrações e proteção antes de qualquer migração. PR descreve problema, resultado, testes, risco e rollback. CI somente leitura por padrão, dependências e actions fixadas em versões revisadas, sem executar código não revisado com segredos de produção.

Consolidar documentos existentes por mapa: vigente, substituído, histórico ou rascunho. Preservar contexto em docs/archive; cada documento vigente tem dono, status, data e links. Os documentos deste pacote ainda são proposta; só viram política do repositório após adoção consciente.

## Contratos obrigatórios

- SiteConfig: URL oficial, nome, contato, endereço validado, redes reais, áreas atendidas.
- ServiceContent: slug único, promessa real, escopo, entregáveis, limitações, prova, FAQ e CTA.
- CaseStudy: cliente autorizado ou anonimizado, problema, intervenção, período, resultado verificável e imagem licenciada.
- LeadInput/LeadReceipt: payload validado, consentimento quando aplicável, ID, estado accepted/failed e correlação; nunca sucesso fictício.
- SessionPrincipal: subject servidor, permissões e escopo; não e-mail do localStorage.
- Job: ID, cargo, status, descrição, datas e requisitos; só vagas reais publicadas.
- ConsentPreferences: versão, categoria, timestamp, persistência, evento, revogação; contrato único.

## Decisões arquiteturais a registrar

ADR-001 manter/reduzir monorepo; ADR-002 fronteira BFF/API e autenticação; ADR-003 canal de contatos e chat; ADR-004 fonte de tokens e estratégia de CSS; ADR-005 conteúdo tipado local vs CMS; ADR-006 política de URLs/redirects; ADR-007 ambientes e release; ADR-008 retenção de dados.

Conteúdo local tipado é a opção inicial de menor complexidade se apenas o desenvolvedor publica. CMS só quando houver necessidade editorial real. Não impor multitenancy, Kafka ou DDD adicional a um site institucional sem caso de uso comprovado.
