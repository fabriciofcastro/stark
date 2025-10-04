import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChatModule } from "./chat/chat.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SecurityMiddleware } from "./middleware/security.middleware";
import { SecurityMonitorService } from "./security/security-monitor.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env.local', '.env'],
		}),
		ThrottlerModule.forRoot({
			ttl: 60, // 1 minuto
			limit: 100, // 100 requests por minuto
		}),
		ChatModule, 
		PrismaModule
	],
	controllers: [AppController],
	providers: [AppService, SecurityMonitorService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(SecurityMiddleware)
			.forRoutes('*');
	}
}
