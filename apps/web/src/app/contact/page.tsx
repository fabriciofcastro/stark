import { ContactPageSeo } from "@/components/sections/contact-page-seo";
import { ContactChatwootBridge } from "@/components/sections/contact-chatwoot-bridge";
import Contact from "@/components/sections/contact";
import { motion } from "framer-motion";
import {
  ThemedSection,
  ThemedContainer,
  ThemedTitle,
} from "@/components/ui/themed-section";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">
      <ContactPageSeo />
      <ContactChatwootBridge />

      {/* Background Elegante para Contato */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradiente Principal */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900" />
        
        {/* Overlay com padrão radial diferente da História */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1)_0%,transparent_50%)]" />
        
        {/* Linhas de energia diagonais */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent transform rotate-12" />
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent transform -rotate-12" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent transform rotate-6" />
        </div>

        {/* Partículas flutuantes em formato de círculos */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-emerald-500/15 to-blue-500/15 blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
            }}
          />
        ))}
        
        {/* Grid hexagonal */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`hex-h-${i}`}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"
              style={{ 
                top: `${i * 6.67}%`,
                transform: `rotate(${i * 12}deg)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Ícone Animado */}
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 shadow-2xl"
              animate={{
                x: [0, 8, -8, 0],
                y: [0, -4, 0],
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 30px rgba(34, 197, 94, 0.4)",
                  "0 0 50px rgba(34, 197, 94, 0.7)",
                  "0 0 30px rgba(34, 197, 94, 0.4)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Entre em Contato
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Nosso{" "}
              <span className="text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text font-semibold">
                formulário inteligente
              </span>{" "}
              guia você passo a passo para garantir que coletemos todas as informações necessárias
            </motion.p>

            {/* Benefícios */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 text-emerald-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Validação em tempo real</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Resposta em até 15 min</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Proposta personalizada</span>
              </div>
            </motion.div>

            {/* Accent Line - Design Elegante */}
            <motion.div
              className="h-1 w-32 mx-auto bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 rounded-full shadow-lg shadow-emerald-500/30"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Formulário mantido com funcionalidade completa */}
      <Contact showHeading={false} />
    </div>
  );
}
