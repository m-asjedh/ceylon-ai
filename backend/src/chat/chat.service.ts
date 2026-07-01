import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OpenRouterService } from './openrouter.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private openRouterService: OpenRouterService,
  ) {}

  createChat(userId: string) {
    return this.prisma.chat.create({
      data: { userId },
    });
  }

  listChats(userId: string) {
    return this.prisma.chat.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getChat(chatId: string, userId: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    if (chat.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return chat;
  }

  async deleteChat(chatId: string, userId: string) {
    const chat = await this.prisma.chat.findUnique({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    if (chat.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    await this.prisma.chat.delete({ where: { id: chatId } });
    return { success: true };
  }

  async sendMessage(chatId: string, userId: string, dto: CreateMessageDto) {
    const chat = await this.prisma.chat.findUnique({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    if (chat.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const userMessage = await this.prisma.message.create({
      data: {
        chatId,
        role: 'user',
        content: dto.content,
      },
    });

    if (chat.title === 'New Chat') {
      const title =
        dto.content.length > 50
          ? dto.content.slice(0, 50) + '...'
          : dto.content;
      await this.prisma.chat.update({
        where: { id: chatId },
        data: { title, updatedAt: new Date() },
      });
    } else {
      await this.prisma.chat.update({
        where: { id: chatId },
        data: { updatedAt: new Date() },
      });
    }

    const history = await this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
      select: { role: true, content: true },
    });

    const assistantContent = await this.openRouterService.chat(history);

    const assistantMessage = await this.prisma.message.create({
      data: {
        chatId,
        role: 'assistant',
        content: assistantContent,
      },
    });

    const updatedChat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      select: { id: true, title: true, updatedAt: true },
    });

    return {
      userMessage,
      assistantMessage,
      chat: updatedChat,
    };
  }
}
