import { EntityRepository, Repository } from 'typeorm';
import { WorkshiftEntity } from '../domain/workshift.entity';

@EntityRepository(WorkshiftEntity)
export class WorkshiftRepository extends Repository<WorkshiftEntity> {}
