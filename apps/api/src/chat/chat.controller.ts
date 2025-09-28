import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatSessionDto, SendMessageDto, EscalateToHumanDto } from './dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('session')
  async createSession(@Body() createChatSessionDto: CreateChatSessionDto) {
    return this.chatService.createChatSession(createChatSessionDto);
  }

  @Post('message')
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.chatService.sendMessage(sendMessageDto);
  }

  @Post('escalate')
  async escalateToHuman(@Body() escalateToHumanDto: EscalateToHumanDto) {
    return this.chatService.escalateToHuman(escalateToHumanDto);
  }

  @Get('session/:sessionId')
  async getSession(@Param('sessionId') sessionId: string) {
    return this.chatService.getSession(sessionId);
  }
}
