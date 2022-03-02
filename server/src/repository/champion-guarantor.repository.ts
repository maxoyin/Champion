import { EntityRepository, Repository } from 'typeorm';
import { ChampionGuarantorEntity } from '../domain/champion-guarantor.entity';

@EntityRepository(ChampionGuarantorEntity)
export class ChampionGuarantorRepository extends Repository<ChampionGuarantorEntity> {}
