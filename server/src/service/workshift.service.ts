import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { WorkshiftDTO } from '../service/dto/workshift.dto';
import { WorkshiftMapper } from '../service/mapper/workshift.mapper';
import { WorkshiftRepository } from '../repository/workshift.repository';

const relationshipNames = [];

@Injectable()
export class WorkshiftService {
  logger = new Logger('WorkshiftService');

  constructor(@InjectRepository(WorkshiftRepository) private workshiftEntityRepository: WorkshiftRepository) {}

  async findById(id: number): Promise<WorkshiftDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.workshiftEntityRepository.findOne(id, options);
    return WorkshiftMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<WorkshiftDTO>): Promise<WorkshiftDTO | undefined> {
    const result = await this.workshiftEntityRepository.findOne(options);
    return WorkshiftMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<WorkshiftDTO>): Promise<[WorkshiftDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.workshiftEntityRepository.findAndCount(options);
    const workshiftEntityDTO: WorkshiftDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(workshiftEntity => workshiftEntityDTO.push(WorkshiftMapper.fromEntityToDTO(workshiftEntity)));
      resultList[0] = workshiftEntityDTO;
    }
    return resultList;
  }

  async save(workshiftEntityDTO: WorkshiftDTO, creator?: string): Promise<WorkshiftDTO | undefined> {
    const entity = WorkshiftMapper.fromDTOtoEntity(workshiftEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.workshiftEntityRepository.save(entity);
    return WorkshiftMapper.fromEntityToDTO(result);
  }

  async update(workshiftEntityDTO: WorkshiftDTO, updater?: string): Promise<WorkshiftDTO | undefined> {
    const entity = WorkshiftMapper.fromDTOtoEntity(workshiftEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.workshiftEntityRepository.save(entity);
    return WorkshiftMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.workshiftEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
