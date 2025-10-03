import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Put, 
  Delete, 
  Query, 
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  CreateChatSessionDto,
  UpdateChatSessionDto,
  SendMessageDto,
  EscalateToHumanDto,
  UpdateEscalationDto,
  CreateUserDto,
  UpdateUserDto,
  CreateNotificationDto,
  UpdateNotificationDto,
  CreateAnalyticsDto,
  CreateContactFormDto,
  UpdateContactFormDto,
} from './dto';

@Controller('api/v1/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // ===== GESTÃO DE USUÁRIOS =====

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.chatService.createUser(createUserDto);
  }

  @Put('users/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.chatService.updateUser(userId, updateUserDto);
  }

  @Get('users/:userId')
  async getUser(@Param('userId') userId: string) {
    return this.chatService.getUser(userId);
  }

  // ===== GESTÃO DE SESSÕES =====

  @Post('sessions')
  async createSession(@Body() createChatSessionDto: CreateChatSessionDto) {
    return this.chatService.createSession(createChatSessionDto);
  }

  @Put('sessions/:sessionId')
  async updateSession(
    @Param('sessionId') sessionId: string,
    @Body() updateChatSessionDto: UpdateChatSessionDto
  ) {
    return this.chatService.updateSession(sessionId, updateChatSessionDto);
  }

  @Get('sessions/:sessionId')
  async getSession(@Param('sessionId') sessionId: string) {
    return this.chatService.getSession(sessionId);
  }

  @Get('sessions')
  async getActiveSessions(@Query('userId') userId?: string) {
    return this.chatService.getActiveSessions(userId);
  }

  // ===== GESTÃO DE MENSAGENS =====

  @Post('messages')
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.chatService.sendMessage(sendMessageDto);
  }

  @Get('sessions/:sessionId/messages')
  async getMessages(
    @Param('sessionId') sessionId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 50
  ) {
    return this.chatService.getMessages(sessionId, page, limit);
  }

  // ===== ESCALAÇÃO =====

  @Post('escalations')
  async escalateToHuman(@Body() escalateToHumanDto: EscalateToHumanDto) {
    return this.chatService.escalateToHuman(escalateToHumanDto);
  }

  @Put('escalations/:ticketId')
  async updateEscalation(
    @Param('ticketId') ticketId: string,
    @Body() updateEscalationDto: UpdateEscalationDto
  ) {
    return this.chatService.updateEscalation(ticketId, updateEscalationDto);
  }

  // ===== ANÁLISES =====

  @Post('analytics')
  async createAnalytics(@Body() createAnalyticsDto: CreateAnalyticsDto) {
    return this.chatService.createAnalytics(createAnalyticsDto);
  }

  @Get('analytics/dashboard')
  async getDashboardStats() {
    return this.chatService.getDashboardStats();
  }

  @Get('analytics/sessions/:sessionId')
  async getSessionAnalytics(@Param('sessionId') sessionId: string) {
    return this.chatService.getSessionAnalytics(sessionId);
  }

  // ===== FORMULÁRIOS DE CONTATO =====

  @Post('contact-forms')
  async createContactForm(@Body() createContactFormDto: CreateContactFormDto) {
    return this.chatService.createContactForm(createContactFormDto);
  }

  @Put('contact-forms/:formId')
  async updateContactForm(
    @Param('formId') formId: string,
    @Body() updateContactFormDto: UpdateContactFormDto
  ) {
    return this.chatService.updateContactForm(formId, updateContactFormDto);
  }

  // ===== NOTIFICAÇÕES =====

  @Post('notifications')
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.chatService.createNotification(createNotificationDto);
  }

  @Get('notifications/users/:userId')
  async getUserNotifications(
    @Param('userId') userId: string,
    @Query('limit') limit: number = 20
  ) {
    return this.chatService.getUserNotifications(userId, limit);
  }

  @Put('notifications/:notificationId/read')
  @HttpCode(HttpStatus.NO_CONTENT)
  async markNotificationAsRead(
    @Param('notificationId') notificationId: string,
    @Body('userId') userId: string
  ) {
    return this.chatService.markNotificationAsRead(notificationId, userId);
  }

  @Put('notifications/users/:userId/read-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  async markAllNotificationsAsRead(@Param('userId') userId: string) {
    return this.chatService.markAllNotificationsAsRead(userId);
  }

  // ===== ENDPOINTS DE SAÚDE =====

  @Get('health')
  async getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'chat-api',
      version: '1.0.0',
    };
  }

  // ===== ENDPOINTS DE CONFIGURAÇÃO =====

  @Get('config')
  async getChatConfig() {
    return {
      botConfig: await this.chatService.getBotConfig(),
      systemConfig: await this.chatService.getSystemConfig(),
    };
  }

  @Put('config')
  async updateSystemConfig(@Body() config: any) {
    return this.chatService.updateSystemConfig(config);
  }
}
