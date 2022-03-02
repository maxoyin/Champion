import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ChampionGuarantorDTO } from '../service/dto/champion-guarantor.dto';
import { ChampionGuarantorMapper } from '../service/mapper/champion-guarantor.mapper';
import { ChampionGuarantorRepository } from '../repository/champion-guarantor.repository';

const relationshipNames = [];
relationshipNames.push('champion');

@Injectable()
export class ChampionGuarantorService {
  logger = new Logger('ChampionGuarantorService');

  constructor(@InjectRepository(ChampionGuarantorRepository) private championGuarantorEntityRepository: ChampionGuarantorRepository) {}

  async findById(id: number): Promise<ChampionGuarantorDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.championGuarantorEntityRepository.findOne(id, options);
    return ChampionGuarantorMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<ChampionGuarantorDTO>): Promise<ChampionGuarantorDTO | undefined> {
    const result = await this.championGuarantorEntityRepository.findOne(options);
    return ChampionGuarantorMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<ChampionGuarantorDTO>): Promise<[ChampionGuarantorDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.championGuarantorEntityRepository.findAndCount(options);
    const championGuarantorEntityDTO: ChampionGuarantorDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(championGuarantorEntity =>
        championGuarantorEntityDTO.push(ChampionGuarantorMapper.fromEntityToDTO(championGuarantorEntity))
      );
      resultList[0] = championGuarantorEntityDTO;
    }
    return resultList;
  }

  async save(championGuarantorEntityDTO: ChampionGuarantorDTO, creator?: string): Promise<ChampionGuarantorDTO | undefined> {
    const entity = ChampionGuarantorMapper.fromDTOtoEntity(championGuarantorEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.championGuarantorEntityRepository.save(entity);
    return ChampionGuarantorMapper.fromEntityToDTO(result);
  }

  async update(championGuarantorEntityDTO: ChampionGuarantorDTO, updater?: string): Promise<ChampionGuarantorDTO | undefined> {
    const entity = ChampionGuarantorMapper.fromDTOtoEntity(championGuarantorEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.championGuarantorEntityRepository.save(entity);
    return ChampionGuarantorMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.championGuarantorEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
