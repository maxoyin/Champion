import { IncidentEntity } from '../../domain/incident.entity';
import { IncidentDTO } from '../dto/incident.dto';

/**
 * A Incident mapper object.
 */
export class IncidentMapper {
  static fromDTOtoEntity(entityDTO: IncidentDTO): IncidentEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new IncidentEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: IncidentEntity): IncidentDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new IncidentDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
