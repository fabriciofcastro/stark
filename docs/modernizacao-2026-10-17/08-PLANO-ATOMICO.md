# Plano de execução atômica

73 tarefas. Todas começam TODO. Responsáveis são papéis propostos; não houve atribuição externa de pessoas ou criação de issues.

Cada tarefa tem entrega restrita e aceite observável. Dependências são gates, não sugestões. Algumas tarefas de backend podem ser encerradas como fora do escopo se D04/D05 desabilitarem permanentemente a feature; a remoção deve ser explícita e testada, nunca simplesmente pular segurança.

## Regras de passagem

- W0/W1 primeiro: bloquear risco e falso sucesso; depois fundação e stack.
- Design e SEO podem ter artefatos preparados após decisões, mas integração depende da fundação estável.
- Features que processam PII só são habilitadas após autorização, retenção e E2E aprovados.
- Antes de DONE: diff revisado, aceite demonstrado, evidência preenchida e documentação atualizada.
- Mudança de escopo exige atualizar dependências; não seguir automaticamente uma lista desatualizada.

## Contrato da evidência

ID; commit; ambiente; versões; comandos; exit codes; casos positivos/negativos; artefato sanitizado; limitações; conclusão; rollback. Screenshots não substituem teste funcional. Teste não executado = NOT_RUN, nunca PASS.

### STK-001 · W0 Baseline · Fixar snapshot auditável
Prioridade: P0 · Papel: Engenharia · Estado: TODO
Dependências: — · Decisões: —

Entrega: Manifesto com SHA, branch, árvore e comandos de baseline

Critério de aceite: SHA e inventário conferem com clone limpo; não registrar segredos

Evidência: `docs/evidence/stk-001.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-002 · W0 Baseline · Classificar publicação e rotas sensíveis
Prioridade: P0 · Papel: Engenharia · Estado: TODO
Dependências: STK-001 · Decisões: D02,D04,D05

Entrega: Lista de ambientes, owners e recursos expostos ou desconhecidos

Critério de aceite: Todo fluxo candidato/chat tem estado conhecido; desconhecido explicitado

Evidência: `docs/evidence/stk-002.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-003 · W0 Baseline · Registrar decisões de escopo
Prioridade: P1 · Papel: Negócio + engenharia · Estado: TODO
Dependências: STK-001 · Decisões: —

Entrega: ADRs D01–D09 com dono e estado

Critério de aceite: Sem decisão presumida como aprovada; tarefas bloqueadas identificadas

Evidência: `docs/evidence/stk-003.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-004 · W1 Contenção · Impedir autenticação simulada em produção
Prioridade: P0 · Papel: Engenharia · Estado: TODO
Dependências: STK-001 · Decisões: —

Entrega: GoogleLogin e callback sem fallback fictício no caminho público

Critério de aceite: Ausência de credencial gera indisponível/erro, nunca usuário fictício

Evidência: `docs/evidence/stk-004.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-005 · W1 Contenção · Bloquear acesso anônimo a dados sensíveis
Prioridade: P0 · Papel: Engenharia · Estado: TODO
Dependências: STK-002 · Decisões: —

Entrega: Gate server-side para candidatos/chat até autorização real

Critério de aceite: Requests sem identidade não consultam nem alteram dados; esconder UI não basta

Evidência: `docs/evidence/stk-005.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-006 · W1 Contenção · Aplicar patch de segurança Next
Prioridade: P0 · Papel: Engenharia · Estado: TODO
Dependências: STK-001 · Decisões: —

Entrega: Next e pares compatíveis na linha corrigida; lock revisado

Critério de aceite: Versão efetiva acima dos boletins aplicáveis; build e smoke comprovados

Evidência: `docs/evidence/stk-006.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-007 · W1 Contenção · Corrigir semântica de sucesso do contato
Prioridade: P0 · Papel: Engenharia · Estado: TODO
Dependências: STK-001 · Decisões: —

Entrega: Resposta accepted somente com aceite durável confirmado

Critério de aceite: Duas integrações em falha retornam erro; nenhum log é tratado como e-mail enviado

Evidência: `docs/evidence/stk-007.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-008 · W1 Contenção · Remover PII dos logs do contato
Prioridade: P0 · Papel: Engenharia · Estado: TODO
Dependências: STK-001 · Decisões: —

Entrega: Logs por requestId sem originalData pessoal

Critério de aceite: Payload sintético não aparece em e-mail/telefone/texto nos logs

Evidência: `docs/evidence/stk-008.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-009 · W2 Fundação · Fixar Node e package manager
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-006 · Decisões: —

Entrega: engines/runtime/pnpm iguais local, CI e Docker

Critério de aceite: Instalação usa mesma versão e clone limpo reproduz dependências

Evidência: `docs/evidence/stk-009.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-010 · W2 Fundação · Remover artefatos gerados do índice futuro
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-001 · Decisões: —

Entrega: Ignore e remoção de logs/cache/backups sem apagar fontes

Critério de aceite: git ls-files não inclui logs/cache; histórico não reescrito sem decisão

Evidência: `docs/evidence/stk-010.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-011 · W2 Fundação · Consolidar lockfile do workspace
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-009 · Decisões: —

Entrega: Um lock autoritativo e instruções da API reconciliadas

Critério de aceite: Frozen install funciona da raiz e build filtrado encontra todos os pacotes

Evidência: `docs/evidence/stk-011.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-012 · W2 Fundação · Alinhar React e seus tipos
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-011 · Decisões: —

Entrega: React/DOM/tipos compatíveis com Next

Critério de aceite: Typecheck sem erro de major de tipos; peers revisados

Evidência: `docs/evidence/stk-012.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-013 · W2 Fundação · Fixar Tailwind estável
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-011 · Decisões: —

Entrega: Tailwind/plugin sem dist-tag next

Critério de aceite: Lock congelado e CSS básico compila

Evidência: `docs/evidence/stk-013.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-014 · W2 Fundação · Separar lint de fix
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-012 · Decisões: —

Entrega: Scripts check somente leitura e fix explícito

Critério de aceite: Lint não abre prompt nem modifica árvore; config resolvida por app

Evidência: `docs/evidence/stk-014.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-015 · W2 Fundação · Estabelecer matriz Jest/transformer
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-011 · Decisões: —

Entrega: Runner, ts-jest e tipos compatíveis

Critério de aceite: Teste unitário existente executa; versões e warnings documentados

Evidência: `docs/evidence/stk-015.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-016 · W2 Fundação · Consolidar documentação vigente
Prioridade: P2 · Papel: Engenharia · Estado: TODO
Dependências: STK-003 · Decisões: —

Entrega: Índice e mapa vigente/substituído/histórico

Critério de aceite: Cada documento atual tem status/dono; links internos válidos

Evidência: `docs/evidence/stk-016.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-017 · W2 Fundação · Criar governança curta para contribuidores e agentes
Prioridade: P2 · Papel: Engenharia · Estado: TODO
Dependências: STK-014,STK-016 · Decisões: D01

Entrega: README, CONTRIBUTING, AGENTS e SECURITY; licença decidida

Critério de aceite: Novo clone segue comandos reais; nenhum gate fictício

Evidência: `docs/evidence/stk-017.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-018 · W2 Fundação · Criar CI de qualidade mínimo
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-014,STK-015,STK-073 · Decisões: —

Entrega: Workflow de instalação, lint, types, builds e testes

Critério de aceite: PR com falha real fica bloqueada; workflow sem segredos em código não revisado

Evidência: `docs/evidence/stk-018.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-019 · W3 Stack · Migrar Turbo para configuração suportada
Prioridade: P2 · Papel: Engenharia · Estado: TODO
Dependências: STK-018 · Decisões: —

Entrega: Versão estável e tasks; env/cache revisados

Critério de aceite: Build frio e com cache produzem rotas equivalentes; cache não mistura ambientes

Evidência: `docs/evidence/stk-019.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-020 · W3 Stack · Migrar configuração Next para major alvo
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-018 · Decisões: —

Entrega: Config sem experimental.turbo legado; webpack tratado conscientemente

Critério de aceite: Next config aceita e build usa bundler escolhido sem fallback silencioso

Evidência: `docs/evidence/stk-020.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-021 · W3 Stack · Resolver params e status de rotas dinâmicas
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-020 · Decisões: —

Entrega: Cidade/blog com params resolvidos e notFound

Critério de aceite: Cidade válida renderiza, inválida dá 404; artigo inexistente não retorna página de sucesso

Evidência: `docs/evidence/stk-021.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-022 · W3 Stack · Atualizar Nest e validar bootstrap
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-015,STK-018,STK-073 · Decisões: —

Entrega: Patches Nest/Express compatíveis e bootstrap testado

Critério de aceite: App inicializa e contratos de rota permanecem ou têm migração documentada

Evidência: `docs/evidence/stk-022.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-023 · W3 Stack · Ensaiar upgrade Prisma em banco descartável
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-022 · Decisões: —

Entrega: Plano 5→6→7 com schema/config/adapter apropriados

Critério de aceite: Generate, migrate e queries funcionam em clone sintético; restauração testada

Evidência: `docs/evidence/stk-023.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-024 · W3 Stack · Corrigir imagem runtime da API
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-009,STK-022,STK-023 · Decisões: —

Entrega: Docker LTS com dependências resolvíveis e Prisma gerado

Critério de aceite: Imagem final inicia não root, consulta banco de teste e health responde corretamente

Evidência: `docs/evidence/stk-024.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-025 · W4 Backend · Definir contrato BFF/API
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-003,STK-022 · Decisões: D07

Entrega: ADR com rotas, hosts, cookies e erros

Critério de aceite: Cada chamada do cliente aponta a endpoint existente

Evidência: `docs/evidence/stk-025.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-026 · W4 Backend · Implementar sessão verificada no servidor
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-004,STK-025 · Decisões: D04

Entrega: OAuth/code/token verificados e cookie de sessão

Critério de aceite: Token inválido/expirado rejeitado; logout e proteção do fluxo testados

Evidência: `docs/evidence/stk-026.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-027 · W4 Backend · Autorizar ownership de candidatos
Prioridade: P0 · Papel: Engenharia · Estado: TODO
Dependências: STK-026 · Decisões: D04

Entrega: Controllers usam subject e campos permitidos

Critério de aceite: Teste A→B negado em leitura/update/candidatura/lista; A→A permitido

Evidência: `docs/evidence/stk-027.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-028 · W4 Backend · Autorizar operações de chat por papel e sessão
Prioridade: P0 · Papel: Engenharia · Estado: TODO
Dependências: STK-026 · Decisões: D05

Entrega: Escopo visitante/agente/admin nos endpoints

Critério de aceite: Visitante não lista nem altera sessões de terceiros; agente sem privilégio negado

Evidência: `docs/evidence/stk-028.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-029 · W4 Backend · Ativar validação dos contratos Nest
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-022 · Decisões: —

Entrega: ValidationPipe e DTOs explícitos de update

Critério de aceite: Campos desconhecidos/inválidos não chegam ao serviço e não alteram role/ownership

Evidência: `docs/evidence/stk-029.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-030 · W4 Backend · Corrigir encerramento do middleware
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-022 · Decisões: —

Entrega: Rejeição encerra use antes de next

Critério de aceite: Handler não chamado após 400/413; sem double-send

Evidência: `docs/evidence/stk-030.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-031 · W4 Backend · Implementar throttling real
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-025,STK-030 · Decisões: —

Entrega: Guard Nest e contador compartilhado contato

Critério de aceite: Limite gera 429 com TTL correto entre instâncias; sem stub allowed:true

Evidência: `docs/evidence/stk-031.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-032 · W4 Backend · Implementar destino durável do lead
Prioridade: P0 · Papel: Engenharia · Estado: TODO
Dependências: STK-007,STK-025 · Decisões: D06

Entrega: Persistência ou integração confirmada com receipt ID

Critério de aceite: Lead sintético confirmado no destino; timeout/falha não gera sucesso

Evidência: `docs/evidence/stk-032.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-033 · W4 Backend · Implementar idempotência e retry de leads
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-032 · Decisões: —

Entrega: Chave de request e reprocessamento controlado

Critério de aceite: Reenvio não duplica lead; falha transitória pode ser recuperada

Evidência: `docs/evidence/stk-033.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-034 · W4 Backend · Definir retenção e ciclo de arquivos pessoais
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-027 · Decisões: D04,D08

Entrega: Política técnica de currículo/chat, acesso e exclusão

Critério de aceite: Dado sintético expira/exclui conforme regra; arquivo privado não acessível anonimamente

Evidência: `docs/evidence/stk-034.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-035 · W4 Backend · Unificar preferências de consentimento
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-003 · Decisões: D08

Entrega: Contrato, migração e revogação banner/GA

Critério de aceite: Aceitar/rejeitar/revogar/recarregar têm estado consistente sem eventos duplicados

Evidência: `docs/evidence/stk-035.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-036 · W4 Backend · Consolidar analytics e redigir eventos sem PII
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-035 · Decisões: —

Entrega: Um provider e catálogo de eventos

Critério de aceite: Somente evento permitido dispara; payload sem nome/e-mail/telefone; sem pageview duplicado

Evidência: `docs/evidence/stk-036.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-037 · W5 Design · Validar direção visual e informação comercial
Prioridade: P1 · Papel: Negócio + design · Estado: TODO
Dependências: STK-003 · Decisões: D01,D03,D09

Entrega: Brief da marca, proposta, navegação e provas autorizadas

Critério de aceite: Serviços/cases/números têm origem e aprovação de negócio

Evidência: `docs/evidence/stk-037.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-038 · W5 Design · Criar tokens CSS semânticos válidos
Prioridade: P1 · Papel: Design + frontend · Estado: TODO
Dependências: STK-013,STK-037 · Decisões: —

Entrega: Paleta/espaço/fonte/raio/foco/motion canônicos

Critério de aceite: Computed styles são cores válidas; pares de contraste medidos

Evidência: `docs/evidence/stk-038.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-039 · W5 Design · Inventariar consumidores e componentes duplicados
Prioridade: P2 · Papel: Engenharia · Estado: TODO
Dependências: STK-038 · Decisões: —

Entrega: Mapa de imports e contrato canônico por família

Critério de aceite: Nenhum componente removido apenas por nome semelhante

Evidência: `docs/evidence/stk-039.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-040 · W5 Design · Consolidar primitivas de formulário e ação
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-039 · Decisões: —

Entrega: Button/link/field/select/feedback

Critério de aceite: Teclado, foco, disabled/loading/erro funcionando no catálogo

Evidência: `docs/evidence/stk-040.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-041 · W5 Design · Reconstruir header e menu empresarial
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-040 · Decisões: —

Entrega: Header/nav/dropdown/drawer usando tokens

Critério de aceite: Mobile/desktop/teclado/Escape/foco e sticky sem cobrir conteúdo

Evidência: `docs/evidence/stk-041.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-042 · W5 Design · Consolidar footer e contato institucional
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-037,STK-040 · Decisões: D02,D03

Entrega: Footer limpo com dados e links confirmados

Critério de aceite: Links e canais válidos; sem placeholders

Evidência: `docs/evidence/stk-042.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-043 · W5 Design · Construir hero e ações reais
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-040,STK-037 · Decisões: —

Entrega: Hero com mensagem clara e CTA navegável

Critério de aceite: Todo CTA tem destino funcional mesmo sem analytics; mídia com dimensões e alt

Evidência: `docs/evidence/stk-043.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-044 · W5 Design · Construir template de serviço
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-040 · Decisões: —

Entrega: Template com escopo/processo/prova/FAQ/CTA

Critério de aceite: Um serviço piloto completo reutiliza contrato e renderiza texto no servidor

Evidência: `docs/evidence/stk-044.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-045 · W5 Design · Aplicar template aos serviços confirmados
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-044 · Decisões: D03

Entrega: Páginas por serviço com conteúdo próprio

Critério de aceite: Todos os serviços publicados têm escopo real e CTA; nenhum texto duplicado por acidente

Evidência: `docs/evidence/stk-045.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-046 · W5 Design · Recompor home com evidência real
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-041,STK-042,STK-043,STK-045 · Decisões: —

Entrega: Home empresarial com sequência editorial

Critério de aceite: Sem dados fictícios e sem seções repetidas; um main e H1 conforme template

Evidência: `docs/evidence/stk-046.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-047 · W5 Design · Recompor empresa e cases
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-037,STK-040 · Decisões: D03

Entrega: Templates empresa/história/equipe e cases/portfólio reconciliados

Critério de aceite: Dados e imagens autorizados; URLs antigas preservadas ou mapeadas

Evidência: `docs/evidence/stk-047.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-048 · W5 Design · Construir contato com feedback verdadeiro
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-033,STK-040 · Decisões: —

Entrega: Form curto com recibo/falha/retry e preservação de campos

Critério de aceite: Falha do backend aparece corretamente; sucesso tem protocolo real

Evidência: `docs/evidence/stk-048.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-049 · W5 Design · Aplicar política de movimento reduzido
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-041,STK-043,STK-046 · Decisões: —

Entrega: Motion/loops/carrossel com reduced-motion e pausa

Critério de aceite: Preferência elimina movimento desnecessário; autoplay pausa no foco e por controle

Evidência: `docs/evidence/stk-049.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-050 · W5 Design · Validar reflow e múltiplos viewports
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-045,STK-046,STK-047,STK-048 · Decisões: —

Entrega: Evidência de 320 a 1920 px, zoom e paisagem

Critério de aceite: Sem overflow ocultado/cortes, foco coberto ou CTA inacessível

Evidência: `docs/evidence/stk-050.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-051 · W6 SEO · Criar registro canônico de conteúdo e URLs
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-037 · Decisões: D02

Entrega: Registro tipado com indexable/datas/metadados

Critério de aceite: Cada rota publicável tem entrada única; testes/privadas excluídas

Evidência: `docs/evidence/stk-051.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-052 · W6 SEO · Gerar metadata por rota no servidor
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-051,STK-021 · Decisões: —

Entrega: Titles, descriptions, canonical e OG por template

Critério de aceite: HTML final contém canonical correto e metadados únicos sem depender de useEffect

Evidência: `docs/evidence/stk-052.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-053 · W6 SEO · Corrigir robots e noindex de preview
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-051 · Decisões: —

Entrega: Regras por ambiente e headers de indexação

Critério de aceite: Recursos públicos renderizáveis; privadas protegidas e preview não indexável

Evidência: `docs/evidence/stk-053.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-054 · W6 SEO · Regerar sitemap de conteúdo publicável
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-051 · Decisões: —

Entrega: Sitemap só 200 canônicas indexáveis

Critério de aceite: Sem lastmod artificial, endpoint privado, URL quebrada ou duplicada

Evidência: `docs/evidence/stk-054.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-055 · W6 SEO · Corrigir dados estruturados de entidade
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-051 · Decisões: D02,D03

Entrega: Organization/Service/Breadcrumb e LocalBusiness quando verdadeiro

Critério de aceite: NAP confirmado e igual ao conteúdo; nenhum escritório fictício por cidade

Evidência: `docs/evidence/stk-055.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-056 · W6 SEO · Adicionar assets sociais e ícones reais
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-037,STK-052 · Decisões: —

Entrega: OG, favicon, apple icon e arquivos usados

Critério de aceite: Paths retornam 200 com MIME/dimensões corretos e URL pública

Evidência: `docs/evidence/stk-056.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-057 · W6 SEO · Consolidar redirects e remover rotas de teste públicas
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-051 · Decisões: —

Entrega: Mapa antigo→novo e rotas internas retiradas/protegidas

Critério de aceite: Sem loop/cadeia desnecessária; links internos apontam direto ao destino

Evidência: `docs/evidence/stk-057.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-058 · W6 SEO · Construir pipeline editorial do blog
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-051,STK-052 · Decisões: —

Entrega: Artigos com autor, datas, fontes, template e 404

Critério de aceite: Artigo real renderiza HTML e schema coerentes; inexistente não é soft 404

Evidência: `docs/evidence/stk-058.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-059 · W6 SEO · Revisar páginas locais e vagas publicáveis
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-021,STK-051 · Decisões: D03,D04

Entrega: Cidade com conteúdo útil e vagas reais controladas

Critério de aceite: Sem cidade artificial/duplicada; JobPosting apenas para vagas elegíveis abertas

Evidência: `docs/evidence/stk-059.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-060 · W6 SEO · Executar crawl SEO e links internos
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-052,STK-053,STK-054,STK-055,STK-056,STK-057 · Decisões: —

Entrega: Relatório de status/assets/headings/canonical/schema

Critério de aceite: Nenhum erro crítico de rastreamento ou metadata nos templates ativos

Evidência: `docs/evidence/stk-060.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-061 · W7 Operação · Remover otimizações tardias e preloads inválidos
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-050,STK-056 · Decisões: —

Entrega: Prioridades definidas por componente, fontes/mídia reais

Critério de aceite: LCP não é marcado lazy por mutação; rede sem preload de recurso ausente

Evidência: `docs/evidence/stk-061.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-062 · W7 Operação · Medir e ajustar orçamento de performance
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-061 · Decisões: —

Entrega: Baseline por rota, laboratório e plano de RUM

Critério de aceite: LCP/INP/CLS ou limites de ausência de campo registrados; orçamento interno justificado

Evidência: `docs/evidence/stk-062.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-063 · W7 Operação · Validar headers e limites na resposta servida
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-030,STK-031,STK-035 · Decisões: —

Entrega: Headers consolidados e CSP ensaiada

Critério de aceite: Integrações funcionam com política escolhida; testes de preflight e origem

Evidência: `docs/evidence/stk-063.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-064 · W7 Operação · Separar liveness/readiness/diagnóstico
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-032 · Decisões: —

Entrega: Endpoints sem métricas fictícias e sem exposição desnecessária

Critério de aceite: Serviço opcional não derruba liveness; dependência obrigatória falha de modo verdadeiro

Evidência: `docs/evidence/stk-064.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-065 · W7 Operação · Configurar projeto Vercel com root correto
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-018,STK-020,STK-053 · Decisões: D02

Entrega: Vínculo repo/Main/apps/web e configuração unificada

Critério de aceite: Build limpo cria preview do SHA esperado; IDs/equipe registrados sem secrets

Evidência: `docs/evidence/stk-065.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-066 · W7 Operação · Configurar backend e banco isolados
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-024,STK-025,STK-034 · Decisões: D07,D08

Entrega: Ambientes/credenciais/rede/backup por provedor escolhido

Critério de aceite: Preview não lê produção e API usa banco correto; restauração ensaiada

Evidência: `docs/evidence/stk-066.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-067 · W7 Operação · Executar journeys e acessibilidade em preview
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-050,STK-060,STK-063,STK-064,STK-065,STK-066 · Decisões: —

Entrega: Relatório E2E/axe/manual com commit e URL

Critério de aceite: Menu, contato e features habilitadas passam; dados sensíveis com testes negativos

Evidência: `docs/evidence/stk-067.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-068 · W7 Operação · Ensaiar rollback da versão e schema
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-067 · Decisões: —

Entrega: Runbook e teste de retorno à versão anterior compatível

Critério de aceite: Rollback restaura serviço sem corromper dados; banco com plano separado

Evidência: `docs/evidence/stk-068.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-069 · W8 Liberação · Configurar domínio e HTTPS
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-065,STK-067 · Decisões: D02

Entrega: Domínio oficial, redirects e certificado

Critério de aceite: Host/canonical/sitemap concordam; OG é público e HTTPS válido

Evidência: `docs/evidence/stk-069.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-070 · W8 Liberação · Publicar commit validado e verificar produção
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-068,STK-069 · Decisões: —

Entrega: Release com deployment/commit/checklist

Critério de aceite: Smoke e contato real sintético passam na URL final; logs sem erro crítico

Evidência: `docs/evidence/stk-070.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-071 · W8 Liberação · Configurar medição pós-publicação
Prioridade: P1 · Papel: SEO + operação · Estado: TODO
Dependências: STK-070 · Decisões: —

Entrega: Search Console, eventos e painéis de entrega/erros

Critério de aceite: Sitemap submetido quando acesso disponível; nenhuma PII no analytics

Evidência: `docs/evidence/stk-071.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-072 · W8 Liberação · Encerrar programa com pendências explícitas
Prioridade: P2 · Papel: Engenharia · Estado: TODO
Dependências: STK-071 · Decisões: —

Entrega: Relatório final, docs vigentes e backlog residual

Critério de aceite: Nenhum TODO apresentado como concluído; baseline antes/depois e owners das dívidas

Evidência: `docs/evidence/stk-072.md`
Rollback: Reverter o commit da tarefa; se envolver dados/infra, aplicar o runbook específico validado antes da execução.

### STK-073 · W2 Fundação · Corrigir contratos do build atual da API
Prioridade: P1 · Papel: Engenharia · Estado: TODO
Dependências: STK-011,STK-015 · Decisões: —

Entrega: gerar Prisma e corrigir configuração Throttler e divergências DTO/schema/interface demonstradas pelos 77 erros de baseline.

Aceite: build API passa com client gerado e sem casts para esconder incompatibilidades; contratos sensíveis têm testes negativos. Esta tarefa deve ocorrer antes do CI integral STK-018 e upgrade Nest STK-022, apesar de adicionada ao final da numeração após validação executável.

Evidência: docs/evidence/stk-073.md. Rollback: reverter commit em ambiente sem migração de banco.
