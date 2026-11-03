# Design empresarial e experiência

Esta é uma especificação de direção e aceite, não uma avaliação visual de tela renderizada. A inspeção confirma múltiplos gradientes, partículas, brilhos, temas e animações no código. O efeito final, contraste e comportamento real devem ser medidos em preview.

## Objetivo de comunicação

Apresentar uma empresa de TI confiável: deixar claro quem é atendido, quais problemas são resolvidos, como funciona o serviço e como iniciar contato. Proposta inicial de hero, sujeita a D01/D03: “Tecnologia confiável para a operação da sua empresa”. Complemento deve citar somente serviços realmente entregues. Não publicar resultados em 30 dias, 99,99% de uptime, certificações ou números de clientes sem comprovação.

## Direção de marca

Evoluir BRAND.md: verde profundo #0C1916, ouro #D4A017 usado como acento e neutros claros/escuros. Não aplicar uma cor diferente de marca para cada serviço; ícones podem diferenciar categorias. Layout editorial com espaço, alinhamento e hierarquia. Reduzir painéis translúcidos sobrepostos, efeitos holográficos, sombras luminosas e elementos flutuantes concorrentes. Fotografia ou diagramas devem explicar o serviço, ter licença e evitar cenários genéricos repetidos.

Paleta é ponto de partida, não selo de contraste. Ouro sobre branco precisa de medição e pode exigir variante mais escura. CTA deve usar par de cores aprovado para texto. Dark/light só se ambos tiverem tokens e QA; um tema empresarial completo é melhor que alternância incompleta.

## Sistema de tokens

Primitivos: paleta, escala espacial 4/8, fonte, pesos, largura, raio, borda, sombra, motion e camadas. Semânticos: canvas, surface, surface-muted, text, text-muted, border, brand, on-brand, focus, danger, success, warning. Componentes: altura, padding e estados por contrato. Uma fonte CSS canônica; TS somente deriva/referencia quando houver necessidade. Não repetir hex em cada componente.

Escala proposta: texto 16–18 px, auxiliar mínimo 14 px para conteúdo operacional, títulos fluidos por clamp com limite testado; linha de leitura ~60–75 caracteres. Fonte sans legível com next/font/local ou fonte de sistema consistente, não preload de arquivo inexistente. Contêiner máximo inicial 1280 px e margens fluidas; validar em vez de impor tamanho fixo a cada tela. Raio discreto 4–8 px proposto, sujeito à marca.

Motion: entrada curta 160–240 ms e foco de atenção moderado; preferir transform/opacity. Sem loop decorativo indispensável à leitura. prefers-reduced-motion elimina parallax e autoplay; não apenas altera variável que o Motion não consome. Carrossel, se mantido, tem pausa explícita, teclas, nome acessível, pausa no foco e altura reservada. Hero estática é a opção inicial mais simples para mensagem única; slides só se forem necessários.

## Componentes canônicos e estados

| Componente | Estados/contrato | Validação |
|---|---|---|
| Button/Link | primary, secondary, ghost; default/hover/focus/disabled/loading | link navega, botão age, nome acessível e foco visível |
| Field | label, descrição, obrigatório, erro e sucesso | label associado, aria-describedby, teclado e autofill |
| Select/Checkbox | estados e opções legíveis | operação sem mouse e erro anunciado |
| Card | serviço/case/artigo com estrutura compartilhada | título/href reais, sem card inteiro com controles aninhados |
| Dialog/Drawer | abrir/fechar, escape, foco e scroll lock | foco retorna ao gatilho e conteúdo externo não é navegável |
| Header/Nav | desktop, dropdown, mobile, sticky/shrink | 320 px sem overflow, teclado, rota ativa e skip link |
| Accordion | expandido/recolhido | heading+button, aria-expanded, conteúdo legível sem animação |
| Form feedback | idle/loading/accepted/error/retry | não apaga preenchimento ao falhar e não promete envio sem recibo |
| Toast | aviso não bloqueante | não é único lugar onde erro de formulário aparece |
| Footer | contato, links, dados legais e redes verificadas | sem links vazios e sem múltiplos CTAs flutuantes |
| ServiceTemplate | intro, problema, escopo, processo, prova, FAQ e CTA | texto e dados tipados, SEO servidor |
| CaseTemplate | contexto, desafio, solução, resultado e fonte | permissão do cliente e métricas datadas |

## Arquitetura de informação proposta

Navegação primária: Início, Serviços, Projetos/Resultados, Empresa, Conteúdo e Contato. Carreiras pode ficar no rodapé se não for objetivo comercial principal. Área de atendimento autenticada deve ter fronteira clara. Manter URLs existentes até definir redirects; rótulos podem estar em português sem mudar slugs imediatamente.

Home: hero com proposta e CTA; evidências verificadas; serviços agrupados por problema; método de trabalho; case real; empresa; CTA final e contato. Evitar repetir a mesma promessa em seis seções. Página de serviço: público, problema, escopo incluído/excluído, etapas, prazo/SLA somente se real, entregáveis, case e contato contextual.

Contato: canais reais e formulário curto; capturar nome, e-mail, empresa opcional, serviço e mensagem, telefone apenas se houver necessidade. Consentimentos específicos e política acessível. Feedback e protocolo dependem de backend real.

Sobre/História/Equipe: avaliar consolidação editorial sem apagar URLs com tráfego; nomes, fotos, trajetória e certificações validados. Blog: lista, categorias apenas se úteis, artigo com autor/data/fontes. Cases e portfólio: consolidar finalidade e separar evidência de demonstração. FAQ acessível; políticas sem alegação automática de conformidade.

## Responsividade e acessibilidade

Testar 320, 360, 390, 768, 1024, 1080, 1280, 1333, 1440, 1640 e 1920 px. Breakpoints são orientados pelo conteúdo, não uma media query para cada número. Cobrir retrato/paisagem, zoom 200% e reflow equivalente a 320 CSS px; nenhuma barra horizontal escondida por overflow-x:hidden para mascarar erro. Tabelas exigem estratégia explícita de overflow, cards devem reordenar logicamente e títulos não cortar palavras.

Aceite WCAG 2.2 AA: contraste textual 4,5:1 normal e 3:1 grande; componentes/foco com contraste aplicável; uma região main por página; headings coerentes; alt útil ou vazio para decorativo; foco não coberto pelo header; alvos de pelo menos 24×24 CSS px conforme critérios/exceções (preferência interna de 44×44); teclado, Escape e leitor de tela. Verificar erros, loading, toque, safe-area e teclado virtual.

Não declarar conformidade só porque axe não reportou erros. Fazer revisão manual das jornadas contato/menu/candidatura/chat além de checks automáticos.
