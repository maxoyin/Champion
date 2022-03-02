import { WorkshiftEntity } from '../../domain/workshift.entity';
import { WorkshiftDTO } from '../dto/workshift.dto';

/**
 * A Workshift mapper object.
 */
export class WorkshiftMapper {
  static fromDTOtoEntity(entityDTO: WorkshiftDTO): WorkshiftEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new WorkshiftEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: WorkshiftEntity): WorkshiftDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new WorkshiftDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
