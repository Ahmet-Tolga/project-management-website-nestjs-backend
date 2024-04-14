import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const baseConfig: any = {
          type: 'postgres',
          host: configService.getOrThrow<string>('DATABASE_HOST'),
          port: configService.getOrThrow<number>('DATABASE_PORT'),
          username: configService.getOrThrow<string>('DATABASE_USERNAME'),
          password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
          database: configService.getOrThrow<string>('DATABASE_NAME'),
          entities: [__dirname + '/../**/*.entity.{ts,js}'],
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
        };

        return baseConfig;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}