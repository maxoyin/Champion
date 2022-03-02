import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { IncidentDTO } from '../service/dto/incident.dto';
import { IncidentMapper } from '../service/mapper/incident.mapper';
import { IncidentRepository } from '../repository/incident.repository';

const relationshipNames = [];
relationshipNames.push('champion');
relationshipNames.push('fieldAgent');
relationshipNames.push('incidentType');
relationshipNames.push('champion');
relationshipNames.push('fieldAgent');

@Injectable()
export class IncidentService {
  logger = new Logger('IncidentService');

  constructor(@InjectRepository(IncidentRepository) private incidentEntityRepository: IncidentRepository) {}

  async findById(id: number): Promise<IncidentDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.incidentEntityRepository.findOne(id, options);
    return IncidentMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<IncidentDTO>): Promise<IncidentDTO | undefined> {
    const result = await this.incidentEntityRepository.findOne(options);
    return IncidentMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<IncidentDTO>): Promise<[IncidentDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.incidentEntityRepository.findAndCount(options);
    const incidentEntityDTO: IncidentDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(incidentEntity => incidentEntityDTO.push(IncidentMapper.fromEntityToDTO(incidentEntity)));
      resultList[0] = incidentEntityDTO;
    }
    return resultList;
  }

  async save(incidentEntityDTO: IncidentDTO, creator?: string): Promise<IncidentDTO | undefined> {
    const entity = IncidentMapper.fromDTOtoEntity(incidentEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.incidentEntityRepository.save(entity);
    return IncidentMapper.fromEntityToDTO(result);
  }

  async update(incidentEntityDTO: IncidentDTO, updater?: string): Promise<IncidentDTO | undefined> {
    const entity = IncidentMapper.fromDTOtoEntity(incidentEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.incidentEntityRepository.save(entity);
    return IncidentMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.incidentEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
