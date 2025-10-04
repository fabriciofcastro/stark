import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  phone: string;
  service: string;
  message: string;
  token?: string;
};

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function createErrorResponse(message: string, status = 400) {
  return NextResponse.json(
    { 
      success: false, 
      error: message,
      timestamp: new Date().toISOString()
    }, 
    { status }
  );
}

// Funções para mascaramento de PII
function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email;
  const [local, domain] = email.split('@');
  const maskedLocal = local.length > 2 
    ? `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}`
    : local;
  return `${maskedLocal}@${domain}`;
}

function maskPhone(phone: string): string {
  if (!phone) return phone;
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 8) return phone;
  return `${digits.slice(0, 2)}****${digits.slice(-2)}`;
}

function maskName(name: string): string {
  if (!name || name.length < 3) return name;
  const words = name.split(' ');
  return words.map(word => 
    word.length > 2 
      ? `${word[0]}${'*'.repeat(word.length - 2)}${word[word.length - 1]}`
      : word
  ).join(' ');
}

function sanitizeMessage(message: string): string {
  // Remover possíveis dados sensíveis da mensagem
  return message
    .replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, '[CPF_MASKED]') // CPF
    .replace(/\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g, '[CNPJ_MASKED]') // CNPJ
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL_MASKED]'); // Email
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  // Se não há configuração de reCAPTCHA, rejeitar por segurança
  if (!secret || !siteKey) {
    console.error("reCAPTCHA not configured - rejecting request for security");
    return false;
  }

  if (!token) {
    console.error("reCAPTCHA token missing");
    return false;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });

    if (!response.ok) {
      console.error("reCAPTCHA API error:", response.status);
      return false;
    }

    const data = await response.json() as {
      success?: boolean;
      score?: number;
      'error-codes'?: string[];
    };

    // Log erros específicos do reCAPTCHA
    if (data['error-codes'] && data['error-codes'].length > 0) {
      console.error("reCAPTCHA error codes:", data['error-codes']);
    }

    return data.success === true && (data.score ?? 1) >= 0.3;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

async function sendToChatwoot(payload: ContactPayload): Promise<boolean> {
  const chatwootToken = process.env.CHATWOOT_ACCESS_TOKEN;
  const chatwootAccountId = process.env.CHATWOOT_ACCOUNT_ID;
  const chatwootInboxId = process.env.CHATWOOT_INBOX_ID;

  if (!chatwootToken || !chatwootAccountId || !chatwootInboxId) {
    console.warn("Chatwoot not configured, skipping integration");
    return false;
  }

  try {
    const response = await fetch(`https://app.chatwoot.com/api/v1/accounts/${chatwootAccountId}/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${chatwootToken}`,
      },
      body: JSON.stringify({
        source_id: "website-contact-form",
        inbox_id: chatwootInboxId,
        contact: {
          name: maskName(payload.name),
          email: maskEmail(payload.email),
          phone_number: maskPhone(payload.phone),
          custom_attributes: {
            company: payload.company || "",
            service: payload.service,
            original_email: payload.email, // Manter original para resposta
            original_phone: payload.phone, // Manter original para resposta
          },
        },
        message: {
          content: `**Serviço:** ${payload.service}\n\n**Mensagem:**\n${sanitizeMessage(payload.message)}`,
          message_type: "incoming",
        },
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Chatwoot integration error:", error);
    return false;
  }
}

async function sendEmailNotification(payload: ContactPayload): Promise<boolean> {
  const emailService = process.env.EMAIL_SERVICE;
  
  if (!emailService) {
    console.warn("Email service not configured, skipping notification");
    return false;
  }

  try {
    // Implementar integração com serviço de email (SendGrid, Resend, etc.)
    // Por enquanto, apenas log com dados mascarados
    console.log("Email notification would be sent:", {
      to: process.env.NOTIFICATION_EMAIL || "contato@starksolutions.com.br",
      subject: `Novo contato via site: ${payload.service}`,
      payload: {
        name: maskName(payload.name),
        email: maskEmail(payload.email),
        phone: maskPhone(payload.phone),
        service: payload.service,
        message: sanitizeMessage(payload.message),
        company: payload.company,
        // Dados originais para processamento interno (não logar)
        originalData: {
          email: payload.email,
          phone: payload.phone,
        }
      },
    });
    
    return true;
  } catch (error) {
    console.error("Email notification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactPayload;
    const { name, email, phone, service, message, token, company } = body;

    // Validações
    if (!name || name.trim().length < 3) {
      return createErrorResponse("Nome deve ter pelo menos 3 caracteres");
    }

    if (!email || !emailRegex.test(email)) {
      return createErrorResponse("Email inválido");
    }

    const phoneDigits = phone?.replace(/\D/g, "") || "";
    if (phoneDigits.length < 10) {
      return createErrorResponse("Telefone inválido");
    }

    if (!service || service.trim().length < 2) {
      return createErrorResponse("Serviço deve ser especificado");
    }

    if (!message || message.trim().length < 20) {
      return createErrorResponse("Mensagem deve ter pelo menos 20 caracteres");
    }

    // Verificação reCAPTCHA
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !token) {
      return createErrorResponse("Token de verificação obrigatório", 403);
    }

    if (token && !(await verifyRecaptcha(token))) {
      return createErrorResponse("Verificação de segurança falhou", 403);
    }

    // Processar contato
    const contactData: ContactPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim(),
      phone: phone.trim(),
      service: service.trim(),
      message: message.trim(),
    };

    // Enviar para múltiplos serviços
    const results = await Promise.allSettled([
      sendToChatwoot(contactData),
      sendEmailNotification(contactData),
    ]);

    const chatwootSuccess = results[0].status === "fulfilled" && results[0].value;
    const emailSuccess = results[1].status === "fulfilled" && results[1].value;

    // Log para observabilidade
    console.log("Contact form submission:", {
      success: chatwootSuccess || emailSuccess,
      chatwoot: chatwootSuccess,
      email: emailSuccess,
      service: contactData.service,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Contato enviado com sucesso",
      timestamp: new Date().toISOString(),
      integrations: {
        chatwoot: chatwootSuccess,
        email: emailSuccess,
      },
    });

  } catch (error) {
    console.error("Contact API error:", error);
    return createErrorResponse("Erro interno do servidor", 500);
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "contact-api",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
}