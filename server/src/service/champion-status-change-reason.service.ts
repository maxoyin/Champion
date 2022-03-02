import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ChampionStatusChangeReasonDTO } from '../service/dto/champion-status-change-reason.dto';
import { ChampionStatusChangeReasonMapper } from '../service/mapper/champion-status-change-reason.mapper';
import { ChampionStatusChangeReasonRepository } from '../repository/champion-status-change-reason.repository';

const relationshipNames = [];

@Injectable()
export class ChampionStatusChangeReasonService {
  logger = new Logger('ChampionStatusChangeReasonService');

  constructor(
    @InjectRepository(ChampionStatusChangeReasonRepository)
    private championStatusChangeReasonEntityRepository: ChampionStatusChangeReasonRepository
  ) {}

  async findById(id: number): Promise<ChampionStatusChangeReasonDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.championStatusChangeReasonEntityRepository.findOne(id, options);
    return ChampionStatusChangeReasonMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<ChampionStatusChangeReasonDTO>): Promise<ChampionStatusChangeReasonDTO | undefined> {
    const result = await this.championStatusChangeReasonEntityRepository.findOne(options);
    return ChampionStatusChangeReasonMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<ChampionStatusChangeReasonDTO>): Promise<[ChampionStatusChangeReasonDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.championStatusChangeReasonEntityRepository.findAndCount(options);
    const championStatusChangeReasonEntityDTO: ChampionStatusChangeReasonDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(championStatusChangeReasonEntity =>
        championStatusChangeReasonEntityDTO.push(ChampionStatusChangeReasonMapper.fromEntityToDTO(championStatusChangeReasonEntity))
      );
      resultList[0] = championStatusChangeReasonEntityDTO;
    }
    return resultList;
  }

  async save(
    championStatusChangeReasonEntityDTO: ChampionStatusChangeReasonDTO,
    creator?: string
  ): Promise<ChampionStatusChangeReasonDTO | undefined> {
    const entity = ChampionStatusChangeReasonMapper.fromDTOtoEntity(championStatusChangeReasonEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.championStatusChangeReasonEntityRepository.save(entity);
    return ChampionStatusChangeReasonMapper.fromEntityToDTO(result);
  }

  async update(
    championStatusChangeReasonEntityDTO: ChampionStatusChangeReasonDTO,
    updater?: string
  ): Promise<ChampionStatusChangeReasonDTO | undefined> {
    const entity = ChampionStatusChangeReasonMapper.fromDTOtoEntity(championStatusChangeReasonEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.championStatusChangeReasonEntityRepository.save(entity);
    return ChampionStatusChangeReasonMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.championStatusChangeReasonEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
