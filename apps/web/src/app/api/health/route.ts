import { NextRequest, NextResponse } from "next/server";

type HealthStatus = {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  version: string;
  environment: string;
  uptime: number;
  services: {
    database?: "healthy" | "degraded" | "unhealthy";
    chatwoot?: "healthy" | "degraded" | "unhealthy";
    analytics?: "healthy" | "degraded" | "unhealthy";
    email?: "healthy" | "degraded" | "unhealthy";
  };
  metrics: {
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
    requests: {
      total: number;
      errors: number;
      success_rate: number;
    };
  };
}

const startTime = Date.now();

async function checkChatwoot(): Promise<"healthy" | "degraded" | "unhealthy"> {
  const chatwootToken = process.env.CHATWOOT_ACCESS_TOKEN;
  const chatwootAccountId = process.env.CHATWOOT_ACCOUNT_ID;
  
  if (!chatwootToken || !chatwootAccountId) {
    return "unhealthy";
  }

  try {
    const response = await fetch(`https://app.chatwoot.com/api/v1/accounts/${chatwootAccountId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${chatwootToken}`,
      },
      signal: AbortSignal.timeout(5000), // 5s timeout
    });

    return response.ok ? "healthy" : "degraded";
  } catch (error) {
    console.error("Chatwoot health check failed:", error);
    return "degraded";
  }
}

async function checkEmailService(): Promise<"healthy" | "degraded" | "unhealthy"> {
  const emailService = process.env.EMAIL_SERVICE;
  
  if (!emailService) {
    return "unhealthy";
  }

  // Implementar check específico baseado no serviço
  // Por enquanto, apenas verificar se está configurado
  return "healthy";
}

function getMemoryUsage() {
  if (typeof process === "undefined") {
    return { used: 0, total: 0, percentage: 0 };
  }

  const memUsage = process.memoryUsage();
  const total = memUsage.heapTotal;
  const used = memUsage.heapUsed;
  const percentage = (used / total) * 100;

  return {
    used: Math.round(used / 1024 / 1024), // MB
    total: Math.round(total / 1024 / 1024), // MB
    percentage: Math.round(percentage * 100) / 100,
  };
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const detailed = url.searchParams.get("detailed") === "true";

    // Health checks básicos
    const [chatwootStatus, emailStatus] = await Promise.allSettled([
      checkChatwoot(),
      checkEmailService(),
    ]);

    const chatwoot = chatwootStatus.status === "fulfilled" ? chatwootStatus.value : "unhealthy";
    const email = emailStatus.status === "fulfilled" ? emailStatus.value : "unhealthy";

    // Determinar status geral
    const services = { chatwoot, email };
    const hasUnhealthy = Object.values(services).includes("unhealthy");
    const hasDegraded = Object.values(services).includes("degraded");
    
    const overallStatus: "healthy" | "degraded" | "unhealthy" = 
      hasUnhealthy ? "unhealthy" : hasDegraded ? "degraded" : "healthy";

    const healthStatus: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      uptime: Date.now() - startTime,
      services: {
        chatwoot,
        email,
        analytics: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? "healthy" : "unhealthy",
      },
      metrics: {
        memory: getMemoryUsage(),
        requests: {
          total: 0, // Implementar contador de requests
          errors: 0, // Implementar contador de erros
          success_rate: 100, // Calcular taxa de sucesso
        },
      },
    };

    const statusCode = overallStatus === "healthy" ? 200 : 
                      overallStatus === "degraded" ? 200 : 503;

    if (!detailed) {
      // Response simplificado para health checks básicos
      return NextResponse.json({
        status: healthStatus.status,
        timestamp: healthStatus.timestamp,
        version: healthStatus.version,
      }, { status: statusCode });
    }

    return NextResponse.json(healthStatus, { status: statusCode });

  } catch (error) {
    console.error("Health check error:", error);
    
    return NextResponse.json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Health check failed",
      version: "1.0.0",
    }, { status: 503 });
  }
}

// Liveness probe (Kubernetes/Docker)
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}