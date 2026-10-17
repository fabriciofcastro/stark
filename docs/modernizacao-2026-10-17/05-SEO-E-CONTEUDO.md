# SEO avançado e governança editorial

SEO deve refletir conteúdo e operação reais. Metadata extensa, keywords e componentes com “advanced” no nome não demonstram indexação nem ranqueamento. Não há promessa de primeira posição ou prazo garantido.

## Fonte única de URLs

Criar registro tipado com path, título, descrição, canonical, indexable, updatedAt real, imagem social e template. Derivar sitemap, breadcrumbs e links internos desse registro. Não gerar sitemap de um dicionário de palavras-chave. Não inventar lastmod; omitir se não houver data de alteração relevante. Registrar redirecionamentos em mapa antigo→novo e validar sem cadeia/loop.

Não mudar contact/services/create-site/governance apenas por estética antes de conhecer backlinks e indexação. Duplicatas devem ter redirect permanente quando a equivalência for comprovada. Rewrites legais atuais podem manter duas URLs servindo o mesmo documento; consolidar canonical ou redirect intencionalmente.

## Matriz por tipo de página

| Tipo | Metadata | Schema elegível/proposto | Conteúdo e indexação |
|---|---|---|---|
| Home | título único, descrição, canonical raiz, OG | Organization; LocalBusiness somente com dados verdadeiros | proposta, serviços reais e evidência |
| Serviço | metadata no servidor e canonical próprio | Service + BreadcrumbList | público, problema, escopo, processo, prova e CTA |
| Cidade atendida | único por cidade real e serviço | areaServed; não inventar escritório local | conteúdo local útil, sem páginas quase iguais em escala |
| Case | título/contexto e OG específico | WebPage/Article se conteúdo adequado | autorização, período e resultado verificável |
| Artigo | author, publishedTime, modifiedTime e OG | Article/BlogPosting com autor real | HTML legível, fontes, links úteis e 404 real |
| Vaga | metadata e URL individual da vaga | JobPosting só para vaga real aberta e campos válidos | expirar/remover marcação quando fechar |
| Contato/Empresa | dados de entidade coerentes | contato/endereço confirmados | NAP consistente em todos os canais |
| Legal | título e canonical próprio | WebPage se necessário | texto revisado para operação efetiva |
| Login/callback/teste/área privada | noindex ou remoção/acesso protegido | nenhum schema comercial | robots não substitui controle de acesso |

Schema não garante rich result. FAQ pode ser útil como conteúdo sem expectativa de destaque no Google; avaliar políticas de elegibilidade. Não publicar reviews, preços, rating, awards, SLA ou certificações fictícias. JSON-LD deve ser serializado de forma segura, inclusive escape de '<' em conteúdo variável, IDs estáveis e sem duplicar entidades contraditórias.

## Implementação técnica

- Metadata API/generateMetadata no servidor; canonical absoluto por rota. Corpo da página e título devem existir no HTML útil, não depender de useEffect para ficarem corretos.
- robots simples e coerente por ambiente. Recursos necessários à renderização e sitemap públicos; preview com proteção e X-Robots-Tag/noindex verificados. Noindex precisa poder ser observado pelo crawler; não combinar bloqueio de crawling de maneira que esconda a instrução.
- sitemap apenas URLs 200 canônicas indexáveis; URLs dinâmicas conhecidas, cidades e artigos aprovados. Não incluir endpoints, callback, testes, parâmetros e privadas.
- Gerar OG 1200×630 real, com zona segura para título/logo, alt e fallback; Twitter card e ícones com arquivos existentes e MIME correto. Testar acesso público sem cookies ou proteção indevida ao arquivo.
- Corrigir inexistentes com notFound/status apropriado; evitar soft 404, URL infinita por params e canonical da home em todas as páginas.
- HTTP/HTTPS e host oficial unificados; redirect em um salto quando possível. Conferir status final, headers e links internos apontando direto ao destino final.
- Imagens com dimensões e sizes adequados, textos alternativos úteis, formatos modernos e prioridade apenas da mídia LCP. Não usar minificação ou preloads como substituto de medição.
- Breadcrumbs visuais e schema coerentes; navegação com links reais. Um H1 descritivo por template como regra interna e headings por hierarquia.

## Estratégia editorial

Priorizar páginas de intenção comercial dos serviços realmente prestados: suporte empresarial, infraestrutura/cloud, cibersegurança, governança e desenvolvimento apenas se confirmados. Para cada serviço escrever problema → impacto → método → entregável → limites → prova → ação. Páginas locais só onde houver atendimento real e informação própria; não trocar apenas o nome da cidade.

Criar clusters úteis a partir de dúvidas reais: continuidade da operação, backup testado, inventário e atualização, migração de infraestrutura, gestão de acesso, custo de suporte e contratação de projeto web. Cada pauta tem intenção, público, autor/revisor, evidência, CTA e link para serviço. Não automatizar publicação de conteúdo genérico em massa.

Cases precisam de autorização e origem. Conteúdo demonstrativo deve ser rotulado; não apresentar como cliente real. Contadores precisam de fonte e data. A promessa comercial dos slides atuais deve passar por validação antes de reutilização.

## Mensuração e aceite

Baseline antes/depois: URLs válidas, status, titles/descriptions/canonicals, cliques/impressões e consultas relevantes do Search Console quando houver acesso; leads confirmados por canal, taxa de entrega e conversão. Nunca enviar e-mail/telefone ou texto de mensagem ao analytics.

Core Web Vitals desejados no percentil 75, quando houver dados de campo suficientes: LCP ≤2,5 s, INP ≤200 ms e CLS ≤0,1. Laboratório é diagnóstico, não evidência de campo. Orçamento inicial de projeto: JS inicial compactado por rota crítica ≤200 KB, imagem hero ≤250 KB e nenhuma regressão >10% sem justificativa; estes dois orçamentos são propostas internas ajustáveis após baseline, não requisitos do Google.

Gate de SEO: crawl de rotas publicáveis; sem 4xx em links internos/OG/assets; canonical correto; HTML útil; sitemap válido; robots por ambiente; schemas testados com ferramentas oficiais quando disponíveis; nenhuma promessa de rich result. Em produção, verificar propriedade no Search Console, enviar sitemap e monitorar indexação e erros após publicação.
