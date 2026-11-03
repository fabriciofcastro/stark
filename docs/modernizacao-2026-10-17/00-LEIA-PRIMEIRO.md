# STARK — auditoria e programa de modernização

Data: 17/10/2026. Fonte: fabriciofcastro/stark, branch `Main`, commit `af72b33935d2e8ab3ac17c9f0866b4cca035d575`.
Estado deste pacote: proposta de execução fundamentada em inspeção do código; não representa melhorias implementadas nem liberação para produção.

## Conclusão executiva

O repositório contém uma base reaproveitável: Next App Router, React, NestJS, Prisma/PostgreSQL, componentes, rotas institucionais e integrações esboçadas. Entretanto, não deve ser considerado pronto para operação empresarial apenas pelas declarações dos documentos existentes. Há funcionalidades simuladas, respostas de sucesso sem entrega comprovada, ausência de proteção de identidade nas operações inspecionadas, dependências que precisam de atualização e fragmentação de estilos/SEO.

A prioridade é: impedir falsa autenticação e perda silenciosa de contatos; estabelecer instalação, validação e CI reproduzíveis; corrigir o modelo de publicação; consolidar conteúdo e design; corrigir SEO e medir a experiência em ambiente executável. Não é necessário reescrever tudo nem adotar microserviços para profissionalizar o projeto.

## Ordem de leitura e execução

1. `01-AUDITORIA-E-EVIDENCIAS.md`: achados, gravidade, limites e referências precisas.
2. `02-REPOSITORIO-E-ARQUITETURA.md`: estrutura, governança, decisões e contratos.
3. `03-STACK-E-MIGRACOES.md`: matriz atual/alvo e sequência segura de atualização.
4. `04-DESIGN-SYSTEM-E-EXPERIENCIA.md`: direção empresarial, componentes, telas e responsividade.
5. `05-SEO-E-CONTEUDO.md`: indexação, metadados, conteúdo, dados estruturados e mensuração.
6. `06-SEGURANCA-E-FLUXOS.md`: identidade, candidatos, contatos, chat e privacidade.
7. `07-VERCEL-CI-E-OPERACAO.md`: ambientes, build, integração, publicação e rollback.
8. `08-PLANO-ATOMICO.md` e `backlog.csv`: tarefas com dependência, entrega, aceite e evidência.
9. `09-VALIDACAO-E-FONTES.md`: matriz de testes e fontes oficiais.
10. `inventario.json` e `rotas.csv`: inventário mecânico do snapshot.

## Como usar

Cada tarefa deve passar por: TODO → READY → IN_PROGRESS → REVIEW → DONE. BLOCKED exige causa e próximo passo. Uma tarefa só fica READY quando suas dependências estão DONE e suas decisões estão resolvidas. Uma wave corresponde a uma branch e PR; tarefas podem ser commits distintos na mesma wave. Não transformar todo o programa em uma única PR.

Manter o código funcional durante a migração. Nenhum gate pode ser registrado como PASS com teste não executado. Cada evidência deve conter commit, comando, versão do runtime, exit code e limitações. Não apagar documentação histórica sem preservar sua rastreabilidade.

## Decisões ainda necessárias

Os trabalhos técnicos de inventário, limpeza não destrutiva, documentação e testes não dependem de todas as decisões abaixo. Apenas as tarefas afetadas ficam bloqueadas.

| ID | Decisão | Padrão proposto | Quem valida | Bloqueia |
|---|---|---|---|---|
| D01 | Identidade e escopo real da STARK | Empresa de serviços de TI para empresas; preservar nome até validação | Responsável pelo negócio | Textos finais e nova marca |
| D02 | Domínio oficial e dados da empresa | Não presumir que o domínio no código está sob controle ou ativo | Responsável pelo domínio | Canonicals de produção, DNS, schema |
| D03 | Oferta e diferenciais comprováveis | Validar serviços, cidades, horários, SLAs, certificações e cases | Negócio/operação | Conteúdo comercial final |
| D04 | Recrutamento nesta fase | Manter isolado e desabilitado até segurança validada | Negócio + técnico | Reativação de candidatos |
| D05 | Atendimento | Escolher Chatwoot como canal ou chat próprio; evitar dois fluxos concorrentes sem necessidade | Operação | Chat definitivo |
| D06 | Destino durável dos contatos | Caixa/CRM com ID de recebimento e tratamento de falha | Operação | Formulário final |
| D07 | Backend e banco | Manter Nest/Postgres se candidatos/chat próprios continuarem | Técnico | Infra do backend |
| D08 | Política de retenção e dados pessoais | Minimização, prazo e atendimento a solicitações documentados | Responsável pelos dados | Produção com PII |
| D09 | Direção visual | Verde profundo + ouro discreto + neutros, evolução de BRAND.md | Responsável pela marca | Design definitivo |

Nenhuma estimativa de prazo ou custo é apresentada como fato. Dimensionar após baseline executável e decisão de escopo. A execução deste pacote não inclui redesign implementado, merge, migração de banco ou publicação.
