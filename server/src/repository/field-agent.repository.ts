import { EntityRepository, Repository } from 'typeorm';
import { FieldAgentEntity } from '../domain/field-agent.entity';

@EntityRepository(FieldAgentEntity)
export class FieldAgentRepository extends Repository<FieldAgentEntity> {}
