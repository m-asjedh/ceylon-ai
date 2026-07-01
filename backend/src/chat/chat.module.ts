import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { OpenRouterService } from './openrouter.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, OpenRouterService],
})
export class ChatModule {}
