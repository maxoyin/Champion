import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebNotificationController } from '../web/rest/web-notification.controller';
import { WebNotificationRepository } from '../repository/web-notification.repository';
import { WebNotificationService } from '../service/web-notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([WebNotificationRepository])],
  controllers: [WebNotificationController],
  providers: [WebNotificationService],
  exports: [WebNotificationService],
})
export class WebNotificationModule {}
