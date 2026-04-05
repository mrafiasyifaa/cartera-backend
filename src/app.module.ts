import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler'
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'mysql',
      host: config.get<string>('DATABASE_HOST'),
      port: parseInt(config.get<string>('DATABASE_PORT') || '3306', 10),
      username: config.get<string>('DATABASE_USER'),
      password: config.get<string>('DATABASE_PASS'),
      database: config.get<string>('DATABASE_NAME'),
      autoLoadEntities: true,
      synchronize: true, //Ubah waktu prod
    }),
  }),
  ThrottlerModule.forRoot([
    {
    ttl: 60000,
    limit: 5,
    },
  ]),
  AuthModule,
  HealthModule,
  MetricsModule,
],
})
export class AppModule {}
