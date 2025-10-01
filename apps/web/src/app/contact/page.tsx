import { ContactPageSeo } from "@/components/sections/contact-page-seo";
import { ContactChatwootBridge } from "@/components/sections/contact-chatwoot-bridge";
import Contact from "@/components/sections/contact";
import {
  ThemedSection,
  ThemedContainer,
  ThemedTitle,
} from "@/components/ui/themed-section";

export default function ContactPage() {
  return (
    <ThemedSection themeName="contact" variant="page" className="min-h-screen">
      <ContactPageSeo />
      <ContactChatwootBridge />

      {/* Header com tema aplicado */}
      <ThemedContainer themeName="contact" className="py-16">
        <header className="mb-10 text-center">
          <ThemedTitle themeName="contact" level={1} className="mb-6">
            Entre em Contato
          </ThemedTitle>
          <p className="mx-auto max-w-3xl text-xl text-white/80">
            Nosso formulário inteligente guia você passo a passo para garantir
            que coletemos todas as informações necessárias para oferecer a
            melhor solução para sua empresa.
          </p>

          {/* Accent Line */}
          <div className="h-1 w-24 mx-auto mt-8 bg-gradient-to-r from-green-400 to-lime-400 rounded-full" />
        </header>
      </ThemedContainer>

      {/* Formulário mantido com funcionalidade completa */}
      <Contact showHeading={false} />
    </ThemedSection>
  );
}
