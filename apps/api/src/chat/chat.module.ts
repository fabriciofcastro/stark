import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { AIAssistantService } from "./ai-assistant.service";
import { NotificationService } from "./notification.service";
import { AnalyticsService } from "./analytics.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
	imports: [PrismaModule],
	controllers: [ChatController],
	providers: [
		ChatService,
		AIAssistantService,
		NotificationService,
		AnalyticsService,
	],
	exports: [
		ChatService,
		AIAssistantService,
		NotificationService,
		AnalyticsService,
	],
})
export class ChatModule {}
