import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  create(@Request() req: { user: { userId: string } }) {
    return this.chatService.createChat(req.user.userId);
  }

  @Get()
  list(@Request() req: { user: { userId: string } }) {
    return this.chatService.listChats(req.user.userId);
  }

  @Get(':id')
  getOne(
    @Param('id') id: string,
    @Request() req: { user: { userId: string } },
  ) {
    return this.chatService.getChat(id, req.user.userId);
  }

  @Post(':id/message')
  sendMessage(
    @Param('id') id: string,
    @Body() dto: CreateMessageDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.chatService.sendMessage(id, req.user.userId, dto);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Request() req: { user: { userId: string } },
  ) {
    return this.chatService.deleteChat(id, req.user.userId);
  }
}
