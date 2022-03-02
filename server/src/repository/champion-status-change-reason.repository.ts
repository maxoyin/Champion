import { EntityRepository, Repository } from 'typeorm';
import { ChampionStatusChangeReasonEntity } from '../domain/champion-status-change-reason.entity';

@EntityRepository(ChampionStatusChangeReasonEntity)
export class ChampionStatusChangeReasonRepository extends Repository<ChampionStatusChangeReasonEntity> {}
