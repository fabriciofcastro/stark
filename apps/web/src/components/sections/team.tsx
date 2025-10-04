"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Cpu,
  Network,
  Database,
  Lock,
  Rocket,
  Orbit,
  Atom,
  CircuitBoard,
  Star,
  Sparkles,
  Zap,
  Shield,
  Code,
  Brain,
  Target,
  Award,
  Users,
  Globe,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Server,
  Cloud,
  Palette
} from "lucide-react";
import { faker } from "@faker-js/faker";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  avatar: string;
  skills: string[];
  experience: number;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  certifications: string[];
  achievements: string[];
  quote: string;
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activeMember, setActiveMember] = useState<string | null>(null);
  const [neuralParticles, setNeuralParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    connections: number[];
  }>>([]);
  
  const teamRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const scrollPercentage = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  // Gerar dados da equipe com Faker.js
  useEffect(() => {
    const departments = [
      "Desenvolvimento", "Infraestrutura", "Segurança", "DevOps", 
      "Cloud Computing", "Inteligência Artificial", "UX/UI", "Gestão"
    ];
    
    const skills = [
      "React", "Node.js", "Python", "Java", "AWS", "Azure", "Docker", 
      "Kubernetes", "Cybersecurity", "Machine Learning", "Blockchain",
      "Microservices", "API Development", "Database Design", "System Architecture"
    ];

    const certifications = [
      "AWS Certified Solutions Architect", "Certified Ethical Hacker",
      "Microsoft Azure Expert", "Google Cloud Professional", "CISSP",
      "CompTIA Security+", "Kubernetes Certified Administrator"
    ];

    const achievements = [
      "Liderou migração para cloud com 40% de redução de custos",
      "Implementou sistema de segurança que reduziu vulnerabilidades em 95%",
      "Desenvolveu aplicação que processa 1M+ transações diárias",
      "Criou arquitetura que melhorou performance em 300%",
      "Estabeleceu práticas DevOps que reduziram deploys de horas para minutos"
    ];

    const quotes = [
      "A tecnologia deve servir ao ser humano, não o contrário.",
      "Inovação é a chave para transformar desafios em oportunidades.",
      "Segurança não é um produto, é um processo contínuo.",
      "A melhor infraestrutura é aquela que você nem percebe que existe.",
      "Código limpo é código que funciona e é fácil de manter.",
      "A simplicidade é a sofisticação suprema.",
      "Dados são o novo petróleo, mas só têm valor se bem refinados."
    ];

    const generateTeamMember = (): TeamMember => {
      const department = faker.helpers.arrayElement(departments);
      const memberSkills = faker.helpers.arrayElements(skills, { min: 3, max: 8 });
      
      return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
        department,
        bio: faker.lorem.paragraphs(2),
        avatar: faker.image.avatar(),
        skills: memberSkills,
        experience: faker.number.int({ min: 2, max: 15 }),
        location: `${faker.location.city()}, ${faker.location.state()}`,
        email: faker.internet.email(),
        linkedin: `https://linkedin.com/in/${faker.helpers.slugify(faker.person.fullName())}`,
        github: `https://github.com/${faker.helpers.slugify(faker.person.firstName())}`,
        certifications: faker.helpers.arrayElements(certifications, { min: 1, max: 4 }),
        achievements: faker.helpers.arrayElements(achievements, { min: 1, max: 3 }),
        quote: faker.helpers.arrayElement(quotes)
      };
    };

    // Gerar 12 membros da equipe
    const members = Array.from({ length: 12 }, generateTeamMember);
    setTeamMembers(members);
  }, []);

  // Neural Network Particles - igual ao footer
  useEffect(() => {
    let animationFrameId: number;
    let isAnimating = false;

    const generateNeuralNetwork = () => {
      const particles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        connections: [] as number[]
      }));

      // Create neural connections
      particles.forEach((particle, i) => {
        const connections: number[] = [];
        for (let j = 0; j < particles.length; j++) {
          if (i !== j && Math.random() > 0.7) {
            connections.push(j);
          }
        }
        particle.connections = connections;
      });

      setNeuralParticles(particles);
    };

    const animateParticles = () => {
      if (!isAnimating) return;
      
      setNeuralParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100
      })));

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    // Iniciar animação apenas quando visível
    const observer = new IntersectionObserver(
      ([entry]) => {
        isAnimating = entry.isIntersecting;
        if (isAnimating) {
          animationFrameId = requestAnimationFrame(animateParticles);
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.1 }
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    generateNeuralNetwork();
    const interval = setInterval(generateNeuralNetwork, 25000);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const getDepartmentIcon = (department: string) => {
    const icons = {
      "Desenvolvimento": Code,
      "Infraestrutura": Server,
      "Segurança": Shield,
      "DevOps": Rocket,
      "Cloud Computing": Cloud,
      "Inteligência Artificial": Brain,
      "UX/UI": Palette,
      "Gestão": Users
    };
    return icons[department as keyof typeof icons] || Users;
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      "Desenvolvimento": "cyan",
      "Infraestrutura": "blue",
      "Segurança": "red",
      "DevOps": "purple",
      "Cloud Computing": "sky",
      "Inteligência Artificial": "pink",
      "UX/UI": "emerald",
      "Gestão": "amber"
    };
    return colors[department as keyof typeof colors] || "gray";
  };

  return (
    <section 
      ref={teamRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)
        `
      }}
    >
      {/* Neural Network Background - igual ao footer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {neuralParticles.map((particle) => 
            particle.connections.map((connectionId) => {
              const connection = neuralParticles[connectionId];
              if (!connection) return null;
              
              const distance = Math.sqrt(
                Math.pow(particle.x - connection.x, 2) + 
                Math.pow(particle.y - connection.y, 2)
              );
              
              if (distance < 30) {
                return (
                  <motion.line
                    key={`${particle.id}-${connectionId}`}
                    x1={`${particle.x}%`}
                    y1={`${particle.y}%`}
                    x2={`${connection.x}%`}
                    y2={`${connection.y}%`}
                    stroke="url(#neuralGradient)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2
                    }}
                  />
                );
              }
              return null;
            })
          )}
          
          {/* Neural Gradient */}
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Tech Icons */}
        {[Cpu, Network, Database, Lock, Rocket, Orbit, Atom, CircuitBoard].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-white/10"
            style={{
              left: `${10 + (index * 12)}%`,
              top: `${20 + (index % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            <Icon size={24} />
          </motion.div>
        ))}
      </div>

      {/* Holographic Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 shadow-2xl">
            <Users className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Nossa Equipe
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Conheça os <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">especialistas</span> que transformam ideias em realidade através da tecnologia
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-cyan-400">
              <Star className="w-5 h-5" fill="currentColor" />
              <span>Especialistas certificados</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <Award className="w-5 h-5" fill="currentColor" />
              <span>Anos de experiência</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <Target className="w-5 h-5" fill="currentColor" />
              <span>Foco em resultados</span>
            </div>
          </div>
          
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-cyan-500/30" />
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {teamMembers.map((member, index) => {
            const DepartmentIcon = getDepartmentIcon(member.department);
            const colorClass = getDepartmentColor(member.department);
            
            return (
              <motion.div
                key={member.id}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setActiveMember(activeMember === member.id ? null : member.id)}
              >
                {/* Quantum Card */}
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 cursor-pointer transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                  
                  {/* Quantum Field */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full border-2 border-white/20 overflow-hidden">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {member.name}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <DepartmentIcon className={`w-4 h-4 text-${colorClass}-400`} />
                      <span className={`text-${colorClass}-400 font-medium text-sm`}>
                        {member.department}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {member.role}
                    </p>
                    
                    {/* Experience */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">
                        {member.experience} anos de experiência
                      </span>
                    </div>
                    
                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {member.skills.slice(0, 3).map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-full">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="text-gray-400 text-sm italic border-l-2 border-cyan-400/30 pl-3">
                      "{member.quote}"
                    </blockquote>
                  </div>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Team Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { icon: Users, label: "Especialistas", value: "12+", color: "cyan" },
            { icon: Award, label: "Certificações", value: "50+", color: "purple" },
            { icon: Globe, label: "Projetos Entregues", value: "200+", color: "emerald" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20`}>
                <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
              </div>
              <div className={`text-4xl font-bold text-${stat.color}-400 mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join Our Team CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Quer fazer parte da nossa equipe?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Estamos sempre procurando por talentos excepcionais que compartilhem nossa paixão por tecnologia e inovação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Vagas Abertas
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enviar Currículo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
