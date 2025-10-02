import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
	CreateChatSessionDto,
	SendMessageDto,
	EscalateToHumanDto,
} from "./dto";

@Injectable()
export class ChatService {
	constructor(private prisma: PrismaService) {}

	async createChatSession(data: CreateChatSessionDto) {
		return this.prisma.chatSession.create({
			data: {
				sessionId: data.sessionId,
				userData: data.userData,
				context: data.context,
				status: "active",
			},
		});
	}

	async sendMessage(data: SendMessageDto) {
		// Processar mensagem com IA
		const response = await this.processMessageWithAI(data);

		// Salvar mensagem no banco
		const message = await this.prisma.chatMessage.create({
			data: {
				sessionId: data.sessionId,
				content: data.content,
				type: data.type,
				metadata: data.metadata,
			},
		});

		return {
			message,
			response,
		};
	}

	async escalateToHuman(data: EscalateToHumanDto) {
		// Criar ticket de escalação
		const ticket = await this.prisma.escalationTicket.create({
			data: {
				sessionId: data.sessionId,
				reason: data.reason,
				priority: data.priority,
				userData: data.userData,
				status: "pending",
			},
		});

		// Notificar especialistas (Slack, Discord, etc.)
		await this.notifySpecialists(ticket);

		return ticket;
	}

	async getSession(sessionId: string) {
		return this.prisma.chatSession.findUnique({
			where: { sessionId },
			include: {
				messages: {
					orderBy: { createdAt: 'asc' }
				}
			}
		});
	}

	private async processMessageWithAI(data: SendMessageDto) {
		// Aqui você integraria com OpenAI, Claude, ou outro serviço de IA
		// Por enquanto, retornamos uma resposta simples

		const responses = {
			greeting: [
				"Olá! Como posso te ajudar hoje?",
				"Oi! Estou aqui para te auxiliar.",
				"Olá! Que bom te ver por aqui!",
			],
			service: [
				"Entendi! Vou te ajudar com isso.",
				"Perfeito! Vamos resolver isso juntos.",
				"Ótimo! Deixe-me te orientar.",
			],
			escalation: [
				"Vou te conectar com um especialista.",
				"Deixe-me transferir você para nossa equipe técnica.",
				"Vou escalar sua solicitação para um especialista.",
			],
		};

		// Lógica simples de detecção de intenção
		const content = data.content.toLowerCase();
		let intent = "greeting";

		if (content.includes("suporte") || content.includes("problema")) {
			intent = "service";
		} else if (content.includes("especialista") || content.includes("humano")) {
			intent = "escalation";
		}

		const responseArray = responses[intent];
		const randomResponse =
			responseArray[Math.floor(Math.random() * responseArray.length)];

		return {
			content: randomResponse,
			intent,
			confidence: 0.8,
			suggestions: this.generateSuggestions(intent),
		};
	}

	private generateSuggestions(intent: string) {
		const suggestions = {
			greeting: [
				"Preciso de suporte técnico",
				"Quero consultoria",
				"Soluções em nuvem",
				"Cibersegurança",
			],
			service: [
				"Falar com especialista",
				"Agendar reunião",
				"Enviar proposta",
				"WhatsApp",
			],
			escalation: ["Confirmar escalação", "Cancelar", "Mais informações"],
		};

		return suggestions[intent] || [];
	}

	private async notifySpecialists(ticket: any) {
		// Implementar notificação para especialistas
		// Slack, Discord, email, etc.
		console.log("Notificando especialistas sobre ticket:", ticket.id);
	}
}
