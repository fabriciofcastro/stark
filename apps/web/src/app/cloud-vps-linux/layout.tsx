import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cloud, VPS e Linux | STARK Solutions",
  description: "Provisionamento, hardening e observabilidade em servidores Linux. Backups, HA, automação (Ansible) e monitoração 24/7.",
  keywords: "cloud, vps, linux, servidores, docker, kubernetes, ansible, monitoração, backups, alta disponibilidade",
  openGraph: {
    title: "Cloud, VPS e Linux | STARK Solutions",
    description: "Provisionamento, hardening e observabilidade em servidores Linux. Backups, HA, automação (Ansible) e monitoração 24/7.",
    type: "website",
    url: `${SITE_URL}/cloud-vps-linux`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud, VPS e Linux | STARK Solutions",
    description: "Provisionamento, hardening e observabilidade em servidores Linux. Backups, HA, automação (Ansible) e monitoração 24/7.",
  },
  alternates: {
    canonical: `${SITE_URL}/cloud-vps-linux`,
  },
};

export default function CloudVpsLinuxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
