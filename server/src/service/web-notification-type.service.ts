import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { WebNotificationTypeDTO } from '../service/dto/web-notification-type.dto';
import { WebNotificationTypeMapper } from '../service/mapper/web-notification-type.mapper';
import { WebNotificationTypeRepository } from '../repository/web-notification-type.repository';

const relationshipNames = [];

@Injectable()
export class WebNotificationTypeService {
  logger = new Logger('WebNotificationTypeService');

  constructor(
    @InjectRepository(WebNotificationTypeRepository) private webNotificationTypeEntityRepository: WebNotificationTypeRepository
  ) {}

  async findById(id: number): Promise<WebNotificationTypeDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.webNotificationTypeEntityRepository.findOne(id, options);
    return WebNotificationTypeMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<WebNotificationTypeDTO>): Promise<WebNotificationTypeDTO | undefined> {
    const result = await this.webNotificationTypeEntityRepository.findOne(options);
    return WebNotificationTypeMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<WebNotificationTypeDTO>): Promise<[WebNotificationTypeDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.webNotificationTypeEntityRepository.findAndCount(options);
    const webNotificationTypeEntityDTO: WebNotificationTypeDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(webNotificationTypeEntity =>
        webNotificationTypeEntityDTO.push(WebNotificationTypeMapper.fromEntityToDTO(webNotificationTypeEntity))
      );
      resultList[0] = webNotificationTypeEntityDTO;
    }
    return resultList;
  }

  async save(webNotificationTypeEntityDTO: WebNotificationTypeDTO, creator?: string): Promise<WebNotificationTypeDTO | undefined> {
    const entity = WebNotificationTypeMapper.fromDTOtoEntity(webNotificationTypeEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.webNotificationTypeEntityRepository.save(entity);
    return WebNotificationTypeMapper.fromEntityToDTO(result);
  }

  async update(webNotificationTypeEntityDTO: WebNotificationTypeDTO, updater?: string): Promise<WebNotificationTypeDTO | undefined> {
    const entity = WebNotificationTypeMapper.fromDTOtoEntity(webNotificationTypeEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.webNotificationTypeEntityRepository.save(entity);
    return WebNotificationTypeMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.webNotificationTypeEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
