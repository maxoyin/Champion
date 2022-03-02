import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebNotificationTypeController } from '../web/rest/web-notification-type.controller';
import { WebNotificationTypeRepository } from '../repository/web-notification-type.repository';
import { WebNotificationTypeService } from '../service/web-notification-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([WebNotificationTypeRepository])],
  controllers: [WebNotificationTypeController],
  providers: [WebNotificationTypeService],
  exports: [WebNotificationTypeService],
})
export class WebNotificationTypeModule {}
