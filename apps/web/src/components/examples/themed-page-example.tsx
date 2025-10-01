"use client";

import { motion } from "framer-motion";
import {
  ThemedSection,
  ThemedContainer,
  ThemedTitle,
  ThemedButton,
} from "@/components/ui/themed-section";
import { getThemeByRoute } from "@/lib/theme-system";

interface ThemedPageExampleProps {
  pathname?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function ThemedPageExample({
  pathname = "/",
  title,
  description,
  children,
}: ThemedPageExampleProps) {
  const theme = getThemeByRoute(pathname);

  return (
    <ThemedSection
      themeName={
        pathname === "/"
          ? "home"
          : theme.name.toLowerCase().replace(/[^a-z]/g, "")
      }
      variant="page"
      className="min-h-screen"
    >
      <ThemedContainer themeName={theme.name} className="py-20">
        {/* Header da Página */}
        <div className="text-center mb-16">
          <ThemedTitle themeName={theme.name} level={1} className="mb-6">
            {title}
          </ThemedTitle>

          <motion.p
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>

          {/* Accent Line */}
          <motion.div
            className={`h-1 w-24 mx-auto mt-8 bg-gradient-to-r ${theme.accent} rounded-full`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </div>

        {/* Conteúdo da Página */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {children}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <ThemedButton
            themeName={theme.name}
            variant="primary"
            size="lg"
            className="mr-4"
            onClick={() => console.log("Ação principal clicada")}
          >
            Começar Agora
          </ThemedButton>

          <ThemedButton
            themeName={theme.name}
            variant="outline"
            size="lg"
            onClick={() => console.log("Ação secundária clicada")}
          >
            Saiba Mais
          </ThemedButton>
        </motion.div>
      </ThemedContainer>
    </ThemedSection>
  );
}

// Exemplo de uso para diferentes páginas
export function SupportPageExample() {
  return (
    <ThemedPageExample
      pathname="/suporte-tecnico"
      title="Suporte Técnico 24/7"
      description="Assistência técnica especializada disponível 24 horas por dia, 7 dias por semana para resolver seus problemas rapidamente."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-4xl mb-4">🔧</div>
          <h3 className="text-xl font-semibold mb-2">Manutenção Preventiva</h3>
          <p className="text-white/70">
            Mantenha seus sistemas sempre atualizados e seguros.
          </p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="text-xl font-semibold mb-2">Configuração Avançada</h3>
          <p className="text-white/70">
            Configurações personalizadas para suas necessidades.
          </p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-4xl mb-4">🛠️</div>
          <h3 className="text-xl font-semibold mb-2">Soluções Rápidas</h3>
          <p className="text-white/70">
            Resolução rápida de problemas técnicos.
          </p>
        </motion.div>
      </div>
    </ThemedPageExample>
  );
}

export function CloudPageExample() {
  return (
    <ThemedPageExample
      pathname="/cloud-vps-linux"
      title="Soluções em Nuvem"
      description="Migre para a nuvem com segurança e eficiência. Infraestrutura escalável e confiável para seu negócio."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Migração Segura</h3>
          <p className="text-white/70 mb-6">
            Migramos seus dados e aplicações para a nuvem de forma segura, sem
            interrupção dos seus negócios.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-green-400 mr-2">✓</span>
              Backup completo antes da migração
            </li>
            <li className="flex items-center">
              <span className="text-green-400 mr-2">✓</span>
              Testes de compatibilidade
            </li>
            <li className="flex items-center">
              <span className="text-green-400 mr-2">✓</span>
              Monitoramento 24/7
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">☁️</div>
            <h4 className="text-xl font-semibold mb-2">AWS / Azure</h4>
            <p className="text-white/70">Plataformas líderes em nuvem</p>
          </div>
        </motion.div>
      </div>
    </ThemedPageExample>
  );
}

export function ContactPageExample() {
  return (
    <ThemedPageExample
      pathname="/contact"
      title="Entre em Contato"
      description="Estamos prontos para ajudar você a transformar sua empresa com tecnologia de ponta."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="text-2xl mr-4">📞</div>
              <div>
                <p className="font-semibold">Telefone</p>
                <p className="text-white/70">+55 (11) 99999-9999</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="text-2xl mr-4">📧</div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-white/70">contato@stark.com.br</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="text-2xl mr-4">📍</div>
              <div>
                <p className="font-semibold">Endereço</p>
                <p className="text-white/70">São Paulo, SP - Brasil</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4 className="text-xl font-semibold mb-4">Formulário de Contato</h4>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            <input
              type="email"
              placeholder="Seu email"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            <textarea
              placeholder="Sua mensagem"
              rows={4}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            <ThemedButton
              themeName="contact"
              variant="primary"
              className="w-full"
            >
              Enviar Mensagem
            </ThemedButton>
          </form>
        </motion.div>
      </div>
    </ThemedPageExample>
  );
}

export default ThemedPageExample;
