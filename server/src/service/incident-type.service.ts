import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { IncidentTypeDTO } from '../service/dto/incident-type.dto';
import { IncidentTypeMapper } from '../service/mapper/incident-type.mapper';
import { IncidentTypeRepository } from '../repository/incident-type.repository';

const relationshipNames = [];

@Injectable()
export class IncidentTypeService {
  logger = new Logger('IncidentTypeService');

  constructor(@InjectRepository(IncidentTypeRepository) private incidentTypeEntityRepository: IncidentTypeRepository) {}

  async findById(id: number): Promise<IncidentTypeDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.incidentTypeEntityRepository.findOne(id, options);
    return IncidentTypeMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<IncidentTypeDTO>): Promise<IncidentTypeDTO | undefined> {
    const result = await this.incidentTypeEntityRepository.findOne(options);
    return IncidentTypeMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<IncidentTypeDTO>): Promise<[IncidentTypeDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.incidentTypeEntityRepository.findAndCount(options);
    const incidentTypeEntityDTO: IncidentTypeDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(incidentTypeEntity => incidentTypeEntityDTO.push(IncidentTypeMapper.fromEntityToDTO(incidentTypeEntity)));
      resultList[0] = incidentTypeEntityDTO;
    }
    return resultList;
  }

  async save(incidentTypeEntityDTO: IncidentTypeDTO, creator?: string): Promise<IncidentTypeDTO | undefined> {
    const entity = IncidentTypeMapper.fromDTOtoEntity(incidentTypeEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.incidentTypeEntityRepository.save(entity);
    return IncidentTypeMapper.fromEntityToDTO(result);
  }

  async update(incidentTypeEntityDTO: IncidentTypeDTO, updater?: string): Promise<IncidentTypeDTO | undefined> {
    const entity = IncidentTypeMapper.fromDTOtoEntity(incidentTypeEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.incidentTypeEntityRepository.save(entity);
    return IncidentTypeMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.incidentTypeEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
