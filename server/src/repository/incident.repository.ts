import { EntityRepository, Repository } from 'typeorm';
import { IncidentEntity } from '../domain/incident.entity';

@EntityRepository(IncidentEntity)
export class IncidentRepository extends Repository<IncidentEntity> {}
