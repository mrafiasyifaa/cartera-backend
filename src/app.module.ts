import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [AuthModule, UsersModule, HealthModule, MetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
