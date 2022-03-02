import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentTypeController } from '../web/rest/incident-type.controller';
import { IncidentTypeRepository } from '../repository/incident-type.repository';
import { IncidentTypeService } from '../service/incident-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncidentTypeRepository])],
  controllers: [IncidentTypeController],
  providers: [IncidentTypeService],
  exports: [IncidentTypeService],
})
export class IncidentTypeModule {}
