"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MessageCircle, 
  Clock, 
  User, 
  Hash,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreVertical,
  Calendar,
  Phone,
  Mail,
  Shield,
  Zap,
  FileText,
  Star,
  TrendingUp,
  Users,
  Activity,
} from 'lucide-react';

interface ChatSession {
  id: string;
  protocol: string;
  userId: string;
  status: 'active' | 'inactive' | 'archived' | 'escalated';
  mode: 'auto' | 'human' | 'hybrid';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  title?: string;
  description?: string;
  tags: string[];
  assignedAgent?: string;
  escalatedAt?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  user: {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
  };
  messages: Array<{
    id: string;
    content: string;
    type: string;
    createdAt: string;
    sender: {
      id: string;
      name: string;
    };
  }>;
  _count: {
    messages: number;
  };
}

export default function AtendimentosPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    duration: number;
    delay: number;
  }>>([]);

  // Gerar partículas animadas
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        duration: Math.random() * 8 + 4,
        delay: Math.random() * 3,
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Carregar sessões (mock data por enquanto)
  useEffect(() => {
    const loadSessions = async () => {
      setIsLoading(true);
      // Simular carregamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockSessions: ChatSession[] = [
        {
          id: '1',
          protocol: 'STARK-1A2B3C-D4E5F6',
          userId: 'user1',
          status: 'active',
          mode: 'auto',
          priority: 'high',
          title: 'Suporte Técnico - Problema de Login',
          description: 'Usuário relatando dificuldades para fazer login no sistema',
          tags: ['suporte', 'login', 'urgente'],
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T11:45:00Z',
          lastActivity: '2024-01-15T11:45:00Z',
          user: {
            id: 'user1',
            name: 'João Silva',
            email: 'joao@email.com',
            avatar: '/avatars/joao.jpg'
          },
          messages: [],
          _count: { messages: 12 }
        },
        {
          id: '2',
          protocol: 'STARK-2B3C4D-E5F6G7',
          userId: 'user2',
          status: 'escalated',
          mode: 'human',
          priority: 'urgent',
          title: 'Consultoria - Implementação de Sistema',
          description: 'Cliente interessado em implementar sistema de gestão',
          tags: ['consultoria', 'vendas', 'implementação'],
          assignedAgent: 'agent1',
          escalatedAt: '2024-01-15T09:15:00Z',
          createdAt: '2024-01-15T08:00:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
          lastActivity: '2024-01-15T10:30:00Z',
          user: {
            id: 'user2',
            name: 'Maria Santos',
            email: 'maria@empresa.com',
            avatar: '/avatars/maria.jpg'
          },
          messages: [],
          _count: { messages: 8 }
        },
        {
          id: '3',
          protocol: 'STARK-3C4D5E-F6G7H8',
          userId: 'user3',
          status: 'resolved',
          mode: 'auto',
          priority: 'normal',
          title: 'Dúvida sobre Preços',
          description: 'Cliente perguntando sobre planos e preços',
          tags: ['vendas', 'preços', 'planos'],
          resolvedAt: '2024-01-14T16:20:00Z',
          createdAt: '2024-01-14T15:00:00Z',
          updatedAt: '2024-01-14T16:20:00Z',
          lastActivity: '2024-01-14T16:20:00Z',
          user: {
            id: 'user3',
            name: 'Pedro Costa',
            email: 'pedro@startup.com',
            avatar: '/avatars/pedro.jpg'
          },
          messages: [],
          _count: { messages: 5 }
        }
      ];
      
      setSessions(mockSessions);
      setFilteredSessions(mockSessions);
      setIsLoading(false);
    };

    loadSessions();
  }, []);

  // Filtrar sessões
  useEffect(() => {
    let filtered = sessions;

    if (searchTerm) {
      filtered = filtered.filter(session => 
        session.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(session => session.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(session => session.priority === priorityFilter);
    }

    setFilteredSessions(filtered);
  }, [sessions, searchTerm, statusFilter, priorityFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="w-4 h-4 text-green-500" />;
      case 'escalated':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'archived':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'escalated':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'resolved':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'archived':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'normal':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'low':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-900 relative overflow-hidden">
      {/* Background animado */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [particle.opacity, 0, particle.opacity],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Gradiente animado */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)",
              "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(6, 182, 212, 0.05) 100%)",
              "linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(139, 92, 246, 0.05) 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <motion.div
              className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <MessageCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Gerenciamento de Atendimentos
            </h1>
          </div>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Gerencie todos os atendimentos do STARK AI em tempo real
          </p>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { icon: Activity, label: 'Ativos', value: sessions.filter(s => s.status === 'active').length, color: 'from-green-500 to-emerald-600' },
            { icon: AlertCircle, label: 'Escalados', value: sessions.filter(s => s.status === 'escalated').length, color: 'from-orange-500 to-red-600' },
            { icon: CheckCircle, label: 'Resolvidos', value: sessions.filter(s => s.status === 'resolved').length, color: 'from-blue-500 to-cyan-600' },
            { icon: Users, label: 'Total', value: sessions.length, color: 'from-purple-500 to-pink-600' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Buscar por protocolo, nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Filtro de Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50"
            >
              <option value="all" className="bg-slate-800">Todos os Status</option>
              <option value="active" className="bg-slate-800">Ativos</option>
              <option value="escalated" className="bg-slate-800">Escalados</option>
              <option value="resolved" className="bg-slate-800">Resolvidos</option>
              <option value="archived" className="bg-slate-800">Arquivados</option>
            </select>

            {/* Filtro de Prioridade */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50"
            >
              <option value="all" className="bg-slate-800">Todas as Prioridades</option>
              <option value="urgent" className="bg-slate-800">Urgente</option>
              <option value="high" className="bg-slate-800">Alta</option>
              <option value="normal" className="bg-slate-800">Normal</option>
              <option value="low" className="bg-slate-800">Baixa</option>
            </select>

            {/* Botão de Exportar */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Lista de Atendimentos */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
              <p className="text-white/60 mt-4">Carregando atendimentos...</p>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg">Nenhum atendimento encontrado</p>
            </div>
          ) : (
            filteredSessions.map((session, index) => (
              <motion.div
                key={session.id}
                className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -2, scale: 1.01 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(session.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}>
                          {session.status.toUpperCase()}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(session.priority)}`}>
                        {session.priority.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <Hash className="w-4 h-4 text-white/40" />
                      <span className="text-white font-mono text-sm">{session.protocol}</span>
                    </div>

                    <h3 className="text-white font-bold text-lg mb-2">{session.title || 'Sem título'}</h3>
                    <p className="text-white/70 text-sm mb-4">{session.description || 'Sem descrição'}</p>

                    <div className="flex items-center space-x-6 text-sm text-white/60">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{session.user.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>{session._count.messages} mensagens</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(session.lastActivity)}</span>
                      </div>
                    </div>

                    {session.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {session.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-lg border border-cyan-500/30"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
                      title="Ver detalhes"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
                      title="Mais opções"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
