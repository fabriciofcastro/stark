// components/sections/cloud-vps-seo.tsx
"use client";

import { JsonLd, serviceData, breadcrumbData } from "@/components/seo/structured-data";

export const CloudVpsSeo = () => {
  const data = serviceData(
    "Cloud, VPS e Linux",
    "Provisionamento, hardening e observabilidade em servidores Linux. Backups, HA, automação (Ansible) e monitoração 24/7.",
  );

  return (
    <>
      <JsonLd data={data} />
      <JsonLd data={breadcrumbData("Cloud, VPS e Linux", "/cloud-vps-linux")} />
    </>
  );
};