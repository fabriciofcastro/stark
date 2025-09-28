import { useEffect } from "react";

const ChatWidget = () => {
  useEffect(() => {
    // Script do Chatwoot
    ((d: Document, t: string) => {
      const BASE_URL = process.env.NEXT_PUBLIC_CHATWOOT_URL as
        | string
        | undefined;
      const g = d.createElement(t) as HTMLScriptElement;
      const s = d.getElementsByTagName(t)[0] as HTMLScriptElement;
      if (!BASE_URL || !g || !s || !s.parentNode) return;
      g.src = `${BASE_URL}/packs/js/sdk.js`;
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g, s);
      g.onload = () => {
        // @ts-expect-error chatwootSDK é injetado pelo script externo
        window.chatwootSDK.run({
          websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN,
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }, []);

  return null;
};

export default ChatWidget;
