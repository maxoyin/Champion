import { EntityRepository, Repository } from 'typeorm';
import { IncidentTypeEntity } from '../domain/incident-type.entity';

@EntityRepository(IncidentTypeEntity)
export class IncidentTypeRepository extends Repository<IncidentTypeEntity> {}
