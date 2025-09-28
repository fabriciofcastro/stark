import { ContactPageSeo } from "@/components/sections/contact-page-seo";
import { ContactChatwootBridge } from "@/components/sections/contact-chatwoot-bridge";
import Contact from "@/components/sections/contact";

export default function ContactPage() {
  return (
    <>
      <ContactPageSeo />
      <ContactChatwootBridge />
      <Contact showHeading={true} />
    </>
  );
}