"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  MessageCircle,
  Clock,
  Target,
  Users,
  Brain,
  Zap,
  Activity,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Star,
  Award,
  PieChart,
  LineChart,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Settings,
  X
} from 'lucide-react';

interface ChatbotAnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
  analytics: any;
  insights: any;
}

const ChatbotAnalytics: React.FC<ChatbotAnalyticsProps> = ({
  isOpen,
  onClose,
  analytics,
  insights
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const metrics = [
    {
      id: 'messages',
      label: 'Total de Mensagens',
      value: analytics.totalMessages,
      change: '+12%',
      trend: 'up',
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'response_time',
      label: 'Tempo Médio de Resposta',
      value: `${Math.round(analytics.averageResponseTime)}ms`,
      change: '-8%',
      trend: 'up',
      icon: Clock,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'satisfaction',
      label: 'Satisfação',
      value: `${Math.round(analytics.satisfactionScore * 100)}%`,
      change: '+5%',
      trend: 'up',
      icon: Heart,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'confidence',
      label: 'Confiança da IA',
      value: `${Math.round(insights.averageConfidence * 100)}%`,
      change: '+3%',
      trend: 'up',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const topIntents = insights.topIntents.map(([intent, count]: [string, number]) => ({
    name: intent,
    count,
    percentage: Math.round((count / analytics.totalMessages) * 100)
  }));

  const sentimentData = [
    {
      label: 'Positivo',
      value: insights.sentimentDistribution.positive,
      color: 'from-green-400 to-emerald-500'
    },
    {
      label: 'Neutro',
      value: insights.sentimentDistribution.neutral,
      color: 'from-gray-400 to-gray-500'
    },
    {
      label: 'Negativo',
      value: insights.sentimentDistribution.negative,
      color: 'from-red-400 to-rose-500'
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-6xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white text-xl font-bold">Analytics do Chatbot IA</h2>
                <p className="text-white/80 text-sm">Insights em tempo real da conversa</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Filtros */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="today">Hoje</option>
                    <option value="week">Esta Semana</option>
                    <option value="month">Este Mês</option>
                    <option value="all">Todo Período</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="overview">Visão Geral</option>
                    <option value="performance">Performance</option>
                    <option value="sentiment">Sentimentos</option>
                    <option value="intents">Intenções</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Activity className="w-4 h-4" />
                <span>Atualizado agora</span>
              </div>
            </div>

            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center`}>
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${
                      metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <TrendingUp className="w-4 h-4" />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Distribuição de Sentimentos */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                    Distribuição de Sentimentos
                  </h3>
                  <div className="text-sm text-gray-400">
                    {analytics.totalMessages} mensagens
                  </div>
                </div>
                <div className="space-y-4">
                  {sentimentData.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 bg-gradient-to-r ${item.color} rounded-full`}></div>
                        <span className="text-white font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${(item.value / analytics.totalMessages) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-bold w-12 text-right">
                          {item.value}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Top Intenções */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-400" />
                    Top Intenções
                  </h3>
                  <div className="text-sm text-gray-400">
                    {topIntents.length} categorias
                  </div>
                </div>
                <div className="space-y-4">
                  {topIntents.slice(0, 5).map((intent, index) => (
                    <motion.div
                      key={intent.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="text-white font-medium capitalize">{intent.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div
                            className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                            style={{ width: `${intent.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-bold w-12 text-right">
                          {intent.count}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Estatísticas Detalhadas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-green-400" />
                  Atividade da Conversa
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mensagens do Usuário</span>
                    <span className="text-white font-bold">{insights.userMessages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Respostas da IA</span>
                    <span className="text-white font-bold">{insights.aiMessages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duração da Sessão</span>
                    <span className="text-white font-bold">
                      {Math.round(insights.sessionDuration / 60000)} min
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-400" />
                  Performance da IA
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confiança Média</span>
                    <span className="text-white font-bold">
                      {Math.round(insights.averageConfidence * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Modelo Principal</span>
                    <span className="text-white font-bold">GPT-4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime</span>
                    <span className="text-green-400 font-bold">99.9%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Qualidade
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Satisfação</span>
                    <span className="text-green-400 font-bold">
                      {Math.round(analytics.satisfactionScore * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Precisão</span>
                    <span className="text-blue-400 font-bold">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Resolução</span>
                    <span className="text-purple-400 font-bold">87%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatbotAnalytics;
