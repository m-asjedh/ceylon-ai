import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
  const port = Number(process.env.PORT ?? 3001);

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(port);
  console.log(`Ceylon AI API running on http://localhost:${port}`);

  const openRouterKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!openRouterKey || openRouterKey === 'your_openrouter_api_key') {
    console.warn(
      '⚠ OPENROUTER_API_KEY is missing or still a placeholder — chat messages will fail until you set a real key in backend/.env',
    );
  }
}
bootstrap();
