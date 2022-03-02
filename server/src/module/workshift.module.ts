import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkshiftController } from '../web/rest/workshift.controller';
import { WorkshiftRepository } from '../repository/workshift.repository';
import { WorkshiftService } from '../service/workshift.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkshiftRepository])],
  controllers: [WorkshiftController],
  providers: [WorkshiftService],
  exports: [WorkshiftService],
})
export class WorkshiftModule {}
