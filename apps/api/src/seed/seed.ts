import { PrismaClient } from '@prisma/client';
import { jobPositionsData } from './job-positions';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.jobApplication.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.jobPosition.deleteMany();

  console.log('🗑️ Dados antigos removidos');

  // Criar vagas
  for (const jobData of jobPositionsData) {
    await prisma.jobPosition.create({
      data: jobData,
    });
  }

  console.log(`✅ ${jobPositionsData.length} vagas criadas`);

  // Criar alguns candidatos de exemplo
  const candidates = [
    {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      linkedin: 'https://linkedin.com/in/joao-silva',
      experience: 'Desenvolvedor Full Stack com 5 anos de experiência em React e Node.js',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
      preferredDepartments: ['Desenvolvimento', 'Cloud Computing'],
      source: 'website'
    },
    {
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '(11) 88888-8888',
      linkedin: 'https://linkedin.com/in/maria-santos',
      experience: 'Especialista em UX/UI com 4 anos de experiência em design de interfaces',
      skills: ['Figma', 'Adobe XD', 'Design System', 'User Research', 'Prototyping'],
      preferredDepartments: ['UX/UI', 'Desenvolvimento'],
      source: 'linkedin'
    }
  ];

  for (const candidateData of candidates) {
    await prisma.candidate.create({
      data: candidateData,
    });
  }

  console.log(`✅ ${candidates.length} candidatos de exemplo criados`);

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
