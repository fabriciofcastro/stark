import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Governança de TI | STARK Solutions",
  description: "Estruturamos processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001 e NIST. Auditoria, gestão de riscos, LGPD e DPA.",
  keywords: "governança de TI, COBIT, ITIL, ISO 27001, NIST, auditoria, gestão de riscos, LGPD, DPA",
  openGraph: {
    title: "Governança de TI | STARK Solutions",
    description: "Estruturamos processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001 e NIST. Auditoria, gestão de riscos, LGPD e DPA.",
    type: "website",
    url: `${SITE_URL}/governanca`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Governança de TI | STARK Solutions",
    description: "Estruturamos processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001 e NIST. Auditoria, gestão de riscos, LGPD e DPA.",
  },
  alternates: {
    canonical: `${SITE_URL}/governanca`,
  },
};

export default function GovernanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
