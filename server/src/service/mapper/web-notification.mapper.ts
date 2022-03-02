import { WebNotificationEntity } from '../../domain/web-notification.entity';
import { WebNotificationDTO } from '../dto/web-notification.dto';

/**
 * A WebNotification mapper object.
 */
export class WebNotificationMapper {
  static fromDTOtoEntity(entityDTO: WebNotificationDTO): WebNotificationEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new WebNotificationEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: WebNotificationEntity): WebNotificationDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new WebNotificationDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
