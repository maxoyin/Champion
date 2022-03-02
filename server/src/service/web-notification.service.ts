import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { WebNotificationDTO } from '../service/dto/web-notification.dto';
import { WebNotificationMapper } from '../service/mapper/web-notification.mapper';
import { WebNotificationRepository } from '../repository/web-notification.repository';

const relationshipNames = [];
relationshipNames.push('webNotificationType');
relationshipNames.push('champion');

@Injectable()
export class WebNotificationService {
  logger = new Logger('WebNotificationService');

  constructor(@InjectRepository(WebNotificationRepository) private webNotificationEntityRepository: WebNotificationRepository) {}

  async findById(id: number): Promise<WebNotificationDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.webNotificationEntityRepository.findOne(id, options);
    return WebNotificationMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<WebNotificationDTO>): Promise<WebNotificationDTO | undefined> {
    const result = await this.webNotificationEntityRepository.findOne(options);
    return WebNotificationMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<WebNotificationDTO>): Promise<[WebNotificationDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.webNotificationEntityRepository.findAndCount(options);
    const webNotificationEntityDTO: WebNotificationDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(webNotificationEntity =>
        webNotificationEntityDTO.push(WebNotificationMapper.fromEntityToDTO(webNotificationEntity))
      );
      resultList[0] = webNotificationEntityDTO;
    }
    return resultList;
  }

  async save(webNotificationEntityDTO: WebNotificationDTO, creator?: string): Promise<WebNotificationDTO | undefined> {
    const entity = WebNotificationMapper.fromDTOtoEntity(webNotificationEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.webNotificationEntityRepository.save(entity);
    return WebNotificationMapper.fromEntityToDTO(result);
  }

  async update(webNotificationEntityDTO: WebNotificationDTO, updater?: string): Promise<WebNotificationDTO | undefined> {
    const entity = WebNotificationMapper.fromDTOtoEntity(webNotificationEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.webNotificationEntityRepository.save(entity);
    return WebNotificationMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.webNotificationEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
