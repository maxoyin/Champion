import { WebNotificationTypeEntity } from '../../domain/web-notification-type.entity';
import { WebNotificationTypeDTO } from '../dto/web-notification-type.dto';

/**
 * A WebNotificationType mapper object.
 */
export class WebNotificationTypeMapper {
  static fromDTOtoEntity(entityDTO: WebNotificationTypeDTO): WebNotificationTypeEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new WebNotificationTypeEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: WebNotificationTypeEntity): WebNotificationTypeDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new WebNotificationTypeDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
