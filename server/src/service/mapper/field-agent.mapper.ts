import { FieldAgentEntity } from '../../domain/field-agent.entity';
import { FieldAgentDTO } from '../dto/field-agent.dto';

/**
 * A FieldAgent mapper object.
 */
export class FieldAgentMapper {
  static fromDTOtoEntity(entityDTO: FieldAgentDTO): FieldAgentEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new FieldAgentEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: FieldAgentEntity): FieldAgentDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new FieldAgentDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
