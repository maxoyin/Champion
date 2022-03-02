import { IncidentTypeEntity } from '../../domain/incident-type.entity';
import { IncidentTypeDTO } from '../dto/incident-type.dto';

/**
 * A IncidentType mapper object.
 */
export class IncidentTypeMapper {
  static fromDTOtoEntity(entityDTO: IncidentTypeDTO): IncidentTypeEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new IncidentTypeEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: IncidentTypeEntity): IncidentTypeDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new IncidentTypeDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
