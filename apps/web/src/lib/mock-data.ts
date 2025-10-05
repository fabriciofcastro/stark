// Mock data para testar a funcionalidade sem backend
export const mockJobPositions = [
  {
    id: "1",
    title: "Desenvolvedor Full Stack Senior",
    department: "Desenvolvimento",
    location: "São Paulo, SP",
    type: "Tempo Integral",
    salary: "R$ 12.000 - R$ 18.000",
    experience: "6+ anos",
    description: "Buscamos um desenvolvedor Full Stack experiente para liderar projetos e mentorar a equipe. Conhecimento em Next.js, Node.js e bancos de dados NoSQL é essencial.",
    requirements: [
      "Experiência comprovada em desenvolvimento Full Stack (6+ anos)",
      "Proficiência em JavaScript/TypeScript, React, Node.js",
      "Experiência com bancos de dados (MongoDB, PostgreSQL)",
      "Conhecimento em arquitetura de microserviços e APIs RESTful",
      "Familiaridade com metodologias ágeis (Scrum/Kanban)",
      "Inglês avançado"
    ],
    benefits: [
      "Plano de saúde e odontológico premium",
      "Vale-refeição/alimentação flexível",
      "Auxílio-educação e certificações",
      "Bônus por performance",
      "Ambiente de trabalho flexível e remoto",
      "Aulas de inglês e desenvolvimento profissional"
    ],
    skills: ["Next.js", "Node.js", "React", "TypeScript", "MongoDB", "AWS"],
    isRemote: true,
    isUrgent: true,
    isActive: true,
    postedDate: "2024-03-01"
  },
  {
    id: "2",
    title: "Especialista em Cloud Computing",
    department: "Cloud Computing",
    location: "Remoto",
    type: "Tempo Integral",
    salary: "R$ 15.000 - R$ 22.000",
    experience: "6+ anos",
    description: "Especialista em soluções cloud para arquitetar e implementar infraestruturas escaláveis e seguras.",
    requirements: [
      "Experiência sólida com provedores de nuvem (AWS, Azure, GCP)",
      "Conhecimento em contêineres (Docker, Kubernetes)",
      "Experiência com Infrastructure as Code (Terraform, CloudFormation)",
      "Habilidade em automação e CI/CD",
      "Certificações relevantes (AWS Certified Solutions Architect, Azure Solutions Architect)",
      "Inglês fluente"
    ],
    benefits: [
      "Plano de saúde e odontológico premium",
      "Vale-refeição/alimentação flexível",
      "Auxílio-educação e certificações",
      "Bônus por performance",
      "Ambiente de trabalho flexível e remoto",
      "Aulas de inglês e desenvolvimento profissional"
    ],
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    isRemote: true,
    isUrgent: false,
    isActive: true,
    postedDate: "2024-01-10"
  },
  {
    id: "3",
    title: "Analista de Segurança da Informação",
    department: "Segurança",
    location: "São Paulo, SP",
    type: "Tempo Integral",
    salary: "R$ 8.000 - R$ 12.000",
    experience: "3+ anos",
    description: "Analista responsável por implementar e manter políticas de segurança da informação na empresa.",
    requirements: [
      "Experiência em segurança da informação (3+ anos)",
      "Conhecimento em frameworks de segurança (ISO 27001, NIST)",
      "Experiência com ferramentas de SIEM e SOAR",
      "Conhecimento em análise de vulnerabilidades",
      "Certificações em segurança (CISSP, CISM, CEH)",
      "Inglês intermediário"
    ],
    benefits: [
      "Plano de saúde e odontológico premium",
      "Vale-refeição/alimentação flexível",
      "Auxílio-educação e certificações",
      "Bônus por performance",
      "Ambiente de trabalho flexível e remoto"
    ],
    skills: ["SIEM", "SOAR", "ISO 27001", "NIST", "CISSP", "CISM"],
    isRemote: false,
    isUrgent: true,
    isActive: true,
    postedDate: "2024-02-15"
  },
  {
    id: "4",
    title: "Especialista em IA/ML",
    department: "Inteligência Artificial",
    location: "São Paulo, SP",
    type: "Tempo Integral",
    salary: "R$ 18.000 - R$ 25.000",
    experience: "5+ anos",
    description: "Especialista em Inteligência Artificial e Machine Learning para desenvolver soluções inovadoras.",
    requirements: [
      "Experiência sólida em IA/ML (5+ anos)",
      "Proficiência em Python, TensorFlow, PyTorch",
      "Conhecimento em processamento de linguagem natural",
      "Experiência com big data e analytics",
      "Conhecimento em cloud computing (AWS, GCP, Azure)",
      "Inglês fluente"
    ],
    benefits: [
      "Plano de saúde e odontológico premium",
      "Vale-refeição/alimentação flexível",
      "Auxílio-educação e certificações",
      "Bônus por performance",
      "Ambiente de trabalho flexível e remoto",
      "Aulas de inglês e desenvolvimento profissional"
    ],
    skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Big Data", "AWS"],
    isRemote: true,
    isUrgent: false,
    isActive: true,
    postedDate: "2024-02-20"
  },
  {
    id: "5",
    title: "UX/UI Designer Senior",
    department: "UX/UI",
    location: "São Paulo, SP",
    type: "Tempo Integral",
    salary: "R$ 10.000 - R$ 15.000",
    experience: "4+ anos",
    description: "Designer experiente para criar interfaces intuitivas e experiências de usuário excepcionais.",
    requirements: [
      "Experiência em UX/UI Design (4+ anos)",
      "Proficiência em Figma, Adobe Creative Suite",
      "Conhecimento em design system e design thinking",
      "Experiência com pesquisa de usuários",
      "Conhecimento em HTML/CSS básico",
      "Portfólio robusto"
    ],
    benefits: [
      "Plano de saúde e odontológico premium",
      "Vale-refeição/alimentação flexível",
      "Auxílio-educação e certificações",
      "Bônus por performance",
      "Ambiente de trabalho flexível e remoto"
    ],
    skills: ["Figma", "Adobe XD", "Sketch", "Design System", "User Research"],
    isRemote: true,
    isUrgent: false,
    isActive: true,
    postedDate: "2024-02-25"
  },
  {
    id: "6",
    title: "DevOps Engineer",
    department: "DevOps",
    location: "São Paulo, SP",
    type: "Tempo Integral",
    salary: "R$ 13.000 - R$ 18.000",
    experience: "4+ anos",
    description: "Engenheiro DevOps para automatizar processos e manter a infraestrutura de desenvolvimento.",
    requirements: [
      "Experiência em DevOps (4+ anos)",
      "Conhecimento em Docker, Kubernetes, Jenkins",
      "Experiência com AWS, Azure ou GCP",
      "Conhecimento em Infrastructure as Code",
      "Experiência com monitoramento e logging",
      "Inglês intermediário"
    ],
    benefits: [
      "Plano de saúde e odontológico premium",
      "Vale-refeição/alimentação flexível",
      "Auxílio-educação e certificações",
      "Bônus por performance",
      "Ambiente de trabalho flexível e remoto"
    ],
    skills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Terraform", "Prometheus"],
    isRemote: true,
    isUrgent: false,
    isActive: true,
    postedDate: "2024-03-05"
  }
];

// Mock API functions
export const mockApi = {
  async getJobPositions() {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockJobPositions;
  },

  async createCandidate(candidateData: any) {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Candidato criado:', candidateData);
    return { id: 'mock-candidate-id', ...candidateData };
  },

  async applyToJob(email: string, jobId: string, coverLetter?: string) {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Candidatura enviada:', { email, jobId, coverLetter });
    return { id: 'mock-application-id', candidateEmail: email, jobPositionId: jobId };
  }
};
