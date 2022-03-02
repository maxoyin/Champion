import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ChampionStatusHistoryDTO } from '../service/dto/champion-status-history.dto';
import { ChampionStatusHistoryMapper } from '../service/mapper/champion-status-history.mapper';
import { ChampionStatusHistoryRepository } from '../repository/champion-status-history.repository';

const relationshipNames = [];
relationshipNames.push('championStatusChangeReason');
relationshipNames.push('champion');

@Injectable()
export class ChampionStatusHistoryService {
  logger = new Logger('ChampionStatusHistoryService');

  constructor(
    @InjectRepository(ChampionStatusHistoryRepository) private championStatusHistoryEntityRepository: ChampionStatusHistoryRepository
  ) {}

  async findById(id: number): Promise<ChampionStatusHistoryDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.championStatusHistoryEntityRepository.findOne(id, options);
    return ChampionStatusHistoryMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<ChampionStatusHistoryDTO>): Promise<ChampionStatusHistoryDTO | undefined> {
    const result = await this.championStatusHistoryEntityRepository.findOne(options);
    return ChampionStatusHistoryMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<ChampionStatusHistoryDTO>): Promise<[ChampionStatusHistoryDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.championStatusHistoryEntityRepository.findAndCount(options);
    const championStatusHistoryEntityDTO: ChampionStatusHistoryDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(championStatusHistoryEntity =>
        championStatusHistoryEntityDTO.push(ChampionStatusHistoryMapper.fromEntityToDTO(championStatusHistoryEntity))
      );
      resultList[0] = championStatusHistoryEntityDTO;
    }
    return resultList;
  }

  async save(championStatusHistoryEntityDTO: ChampionStatusHistoryDTO, creator?: string): Promise<ChampionStatusHistoryDTO | undefined> {
    const entity = ChampionStatusHistoryMapper.fromDTOtoEntity(championStatusHistoryEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.championStatusHistoryEntityRepository.save(entity);
    return ChampionStatusHistoryMapper.fromEntityToDTO(result);
  }

  async update(championStatusHistoryEntityDTO: ChampionStatusHistoryDTO, updater?: string): Promise<ChampionStatusHistoryDTO | undefined> {
    const entity = ChampionStatusHistoryMapper.fromDTOtoEntity(championStatusHistoryEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.championStatusHistoryEntityRepository.save(entity);
    return ChampionStatusHistoryMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.championStatusHistoryEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
