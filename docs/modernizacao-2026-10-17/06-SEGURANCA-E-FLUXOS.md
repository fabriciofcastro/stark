# Segurança, privacidade e fluxos reais

## Contenção antes de publicação

Não disponibilizar candidatos/controles de chat próprios enquanto não houver autenticação e autorização testadas. Isso pode ser feito por feature flag no servidor ou bloqueio real de rota; ocultar botão não protege API. Para o site institucional inicial, manter contato real e conteúdo público pode reduzir o escopo de risco.

## Identidade e autorização

Escolher biblioteca/provedor de sessão compatível com stack e operação; registrar ADR. O usuário não precisa criar conta para pedir orçamento. Candidatos e agentes precisam de identidade validada no servidor. OAuth exige code/token validado, redirect URI allowlist e proteções state/nonce/PKCE conforme mecanismo escolhido. JWT não fica verificado por ser decodificado no navegador. Cookie HttpOnly/Secure/SameSite apropriado, expiração, logout/revogação e defesa CSRF conforme transporte.

Backend obtém subject da sessão; resolve candidato dono e autoriza operação. DTO update com allowlist explícita evita mass assignment. Nunca autorizar a partir de `candidateEmail`, role ou userId enviados pelo cliente. Testes obrigatórios: anônimo é rejeitado; A acessa A; A não acessa B; agente só vê o que lhe compete; admin tem trilha de ação. Não usar CPF/e-mail em URL como identificador de acesso.

## Contato confiável

1. Validar body, limite de tamanho e tipos; normalizar campos sem destruir texto legítimo.
2. Aplicar antiabuso no servidor, rate limit compartilhado e verificação captcha se adotada. Validar hostname/action/score quando aplicável ao produto configurado; ausência de configuração de segurança não pode silenciosamente abrir a rota em produção.
3. Criar ID idempotente e recibo após persistência ou aceite confirmado por destino durável.
4. Encaminhar ao canal escolhido com timeout, retry limitado e registro de falha sem PII.
5. Só informar “recebido” quando houver aceite real. Se ambos os destinos falharem e nada estiver persistido, responder erro; manter campos do usuário e oferecer canal alternativo.
6. Guardar correlação, estado e tentativa. Não prometer SLA sem operação responsável.

Definir que “recebido” não significa “entregue à caixa final” quando houver fila. Interface deve mostrar a etapa verdadeira. Não manter integração de e-mail que só faz console.log. Usar provider escolhido e validar contrato Chatwoot com documentação oficial atual antes de implementar; o formato atual não foi homologado nesta auditoria.

## Chat e carreiras

Chat visitante usa sessão curta e só seu histórico. Operações de agente/admin têm autorização; IDs e protocolo são identificadores, não credenciais suficientes. Limitar tamanho de mensagens, paginação, retenção e abuso; validar anexos se existirem. Se IA for mantida, chave somente no servidor, custo limitado, dados mínimos, fallback e proibição de ação sensível sem autorização. Inspeção não comprova IA real apenas pelo nome ai-assistant.service.

Vagas: fonte real, estados aberta/fechada, candidatura idempotente e confirmação. Currículos, se habilitados, usam limites, tipos/MIME, inspeção de arquivo, armazenamento privado, expiração e URLs assinadas; arquivos nunca executáveis ou publicamente enumeráveis. Não implementar upload só com input visual.

## Middleware e infraestrutura

ValidationPipe e DTOs próprios para criação/update. Guard de throttle realmente ligado e testado; não aceitar função stub. CORS com origins explícitas e preflight/credentials compatíveis com arquitetura; CORS não substitui autenticação. Resposta de rejeição encerra pipeline. Configurar limites no parser e proxy em vez de confiar apenas em Content-Length.

Não tratar palavras como select/admin em URL/User-Agent como defesa principal contra ataque. Parametrização, validação de contratos e autorização são controles reais. User-Agent curto não deveria bloquear ferramenta legítima sem motivo operacional.

Headers devem ter dono e teste na resposta servida: CSP inicialmente em report-only se houver muitas integrações, depois enforce com allowlist mínima, frame-ancestors conforme incorporação, nosniff, referrer e permissions adequados. HSTS só após HTTPS/domínios verificados. Remover X-XSS-Protection legado se política atual justificar. SVG e remotePatterns revisados; não habilitar recursos perigosos sem necessidade.

## Privacidade operacional

Inventariar dados e finalidade de contato/currículo/chat; destinatários, retenção, exclusão e responsável. Política deve refletir o que é processado. A revisão jurídica não foi realizada neste trabalho; não declarar conformidade LGPD automaticamente.

Unificar consentimento e revogação por finalidade. Testar analytics/marketing na rede; analisar separadamente características de Vercel Analytics, sem presumir cookie ou mesma base de processamento do GA. Não enviar PII em eventos. Logs com requestId e erros sanitizados; erro interno não devolve stack ou segredo. Secrets no provedor de ambiente, jamais em docs, commits ou NEXT_PUBLIC.

Backup/restauração do Postgres testados; migrations revisadas e credencial de aplicação com privilégio mínimo. Não executar script db:reset fora de ambiente descartável. Plano de incidente inclui identificar versão implantada, conter rota, preservar logs sanitizados e corrigir/rotacionar credenciais se exposição for confirmada ou indicada por boletim aplicável.
