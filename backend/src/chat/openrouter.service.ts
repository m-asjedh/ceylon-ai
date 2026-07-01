import {
  Injectable,
  ServiceUnavailableException,
  InternalServerErrorException,
  BadGatewayException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface ChatMessage {
  role: string;
  content: string;
}

interface OpenRouterChoice {
  message?: {
    role: string;
    content: string;
  };
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
  error?: {
    message?: string;
    code?: number;
  };
  message?: string;
}

const PLACEHOLDER_KEYS = new Set([
  '',
  'your_openrouter_api_key',
  'change-me',
  'sk-xxx',
]);

@Injectable()
export class OpenRouterService {
  private static readonly API_URL =
    'https://openrouter.ai/api/v1/chat/completions';

  constructor(private configService: ConfigService) {}

  private getApiKey(): string {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY')?.trim();

    if (!apiKey || PLACEHOLDER_KEYS.has(apiKey)) {
      throw new InternalServerErrorException(
        'OpenRouter API key is not configured. Add a valid OPENROUTER_API_KEY to backend/.env (get one at https://openrouter.ai/keys).',
      );
    }

    return apiKey;
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    const apiKey = this.getApiKey();
    const model =
      this.configService.get<string>('OPENROUTER_MODEL') ?? 'openrouter/free';

    try {
      const response = await fetch(OpenRouterService.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer':
            this.configService.get<string>('FRONTEND_URL') ??
            'http://localhost:3000',
          'X-Title': 'Ceylon AI',
        },
        body: JSON.stringify({
          model,
          messages,
        }),
      });

      const data = (await response.json()) as OpenRouterResponse;
      const errorMessage =
        data.error?.message ?? data.message ?? 'OpenRouter request failed.';

      if (!response.ok) {
        if (response.status === 401 || /auth/i.test(errorMessage)) {
          throw new BadGatewayException(
            'OpenRouter rejected the API key. Check OPENROUTER_API_KEY in backend/.env and restart the backend.',
          );
        }
        throw new ServiceUnavailableException(errorMessage);
      }

      const content = data.choices?.[0]?.message?.content?.trim();
      if (!content) {
        throw new ServiceUnavailableException(
          'OpenRouter returned an empty response. Please try again.',
        );
      }

      return content;
    } catch (error) {
      if (
        error instanceof ServiceUnavailableException ||
        error instanceof InternalServerErrorException ||
        error instanceof BadGatewayException
      ) {
        throw error;
      }
      throw new ServiceUnavailableException(
        'Unable to reach OpenRouter. Check your API key and internet connection.',
      );
    }
  }
}
