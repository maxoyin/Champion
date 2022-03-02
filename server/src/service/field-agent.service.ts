import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { FieldAgentDTO } from '../service/dto/field-agent.dto';
import { FieldAgentMapper } from '../service/mapper/field-agent.mapper';
import { FieldAgentRepository } from '../repository/field-agent.repository';

const relationshipNames = [];
relationshipNames.push('workshift');

@Injectable()
export class FieldAgentService {
  logger = new Logger('FieldAgentService');

  constructor(@InjectRepository(FieldAgentRepository) private fieldAgentEntityRepository: FieldAgentRepository) {}

  async findById(id: number): Promise<FieldAgentDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.fieldAgentEntityRepository.findOne(id, options);
    return FieldAgentMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<FieldAgentDTO>): Promise<FieldAgentDTO | undefined> {
    const result = await this.fieldAgentEntityRepository.findOne(options);
    return FieldAgentMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<FieldAgentDTO>): Promise<[FieldAgentDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.fieldAgentEntityRepository.findAndCount(options);
    const fieldAgentEntityDTO: FieldAgentDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(fieldAgentEntity => fieldAgentEntityDTO.push(FieldAgentMapper.fromEntityToDTO(fieldAgentEntity)));
      resultList[0] = fieldAgentEntityDTO;
    }
    return resultList;
  }

  async save(fieldAgentEntityDTO: FieldAgentDTO, creator?: string): Promise<FieldAgentDTO | undefined> {
    const entity = FieldAgentMapper.fromDTOtoEntity(fieldAgentEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.fieldAgentEntityRepository.save(entity);
    return FieldAgentMapper.fromEntityToDTO(result);
  }

  async update(fieldAgentEntityDTO: FieldAgentDTO, updater?: string): Promise<FieldAgentDTO | undefined> {
    const entity = FieldAgentMapper.fromDTOtoEntity(fieldAgentEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.fieldAgentEntityRepository.save(entity);
    return FieldAgentMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.fieldAgentEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
