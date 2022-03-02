import { EntityRepository, Repository } from 'typeorm';
import { ChampionStatusHistoryEntity } from '../domain/champion-status-history.entity';

@EntityRepository(ChampionStatusHistoryEntity)
export class ChampionStatusHistoryRepository extends Repository<ChampionStatusHistoryEntity> {}
