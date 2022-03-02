import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldAgentController } from '../web/rest/field-agent.controller';
import { FieldAgentRepository } from '../repository/field-agent.repository';
import { FieldAgentService } from '../service/field-agent.service';

@Module({
  imports: [TypeOrmModule.forFeature([FieldAgentRepository])],
  controllers: [FieldAgentController],
  providers: [FieldAgentService],
  exports: [FieldAgentService],
})
export class FieldAgentModule {}
