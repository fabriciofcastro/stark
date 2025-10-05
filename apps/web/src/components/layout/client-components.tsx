'use client';

/**
 * Client Components Wrapper
 * Gerencia todos os componentes que precisam ser renderizados no cliente
 */

import dynamic from 'next/dynamic';

// Componentes que precisam ser renderizados apenas no cliente
export const RevealOnScroll = dynamic(() => 
  import("@/components/wrappers").then(mod => mod.RevealOnScroll), 
  { ssr: false }
);

export const HashRedirector = dynamic(() => 
  import("@/components/wrappers").then(mod => mod.HashRedirector), 
  { ssr: false }
);

export const GA4 = dynamic(() => 
  import("@/components/wrappers").then(mod => mod.GA4), 
  { ssr: false }
);

export const ModernCookieConsent = dynamic(() => 
  import("@/components/ui/modern-cookie-consent"), 
  { ssr: false }
);

export const ChatProvider = dynamic(() => 
  import("@/components/chat").then(mod => mod.ChatProvider), 
  { ssr: false }
);

export const Toaster = dynamic(() => 
  import("@/components/ui/Toast").then(mod => ({ default: mod.ToastProvider })), 
  { ssr: false }
);

export const AdvancedPerformanceOptimizer = dynamic(() => 
  import("@/components/performance/advanced-performance").then(mod => mod.AdvancedPerformanceOptimizer), 
  { ssr: false }
);

export const FloatingSocialShare = dynamic(() => 
  import("@/components/social").then(mod => mod.FloatingSocialShare), 
  { ssr: false }
);

export const FloatingSocialFollow = dynamic(() => 
  import("@/components/social").then(mod => mod.FloatingSocialFollow), 
  { ssr: false }
);

export const StrategicCTA = dynamic(() => 
  import("@/components/cta").then(mod => mod.StrategicCTA), 
  { ssr: false }
);
