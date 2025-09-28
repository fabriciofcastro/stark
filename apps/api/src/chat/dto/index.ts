export class CreateChatSessionDto {
	sessionId: string;
	userData: {
		name: string;
		email: string;
		phone: string;
		company: string;
	};
	context: {
		page: string;
		userAgent: string;
		timestamp: string;
	};
}

export class SendMessageDto {
	sessionId: string;
	content: string;
	type: "user" | "bot" | "system";
	metadata?: any;
}

export class EscalateToHumanDto {
	sessionId: string;
	reason: string;
	priority: "low" | "medium" | "high" | "urgent";
	userData: {
		name: string;
		email: string;
		phone: string;
		company: string;
		service: string;
		urgency: string;
		message: string;
	};
}
