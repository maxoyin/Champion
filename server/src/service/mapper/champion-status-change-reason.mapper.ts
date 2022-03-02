import { ChampionStatusChangeReasonEntity } from '../../domain/champion-status-change-reason.entity';
import { ChampionStatusChangeReasonDTO } from '../dto/champion-status-change-reason.dto';

/**
 * A ChampionStatusChangeReason mapper object.
 */
export class ChampionStatusChangeReasonMapper {
  static fromDTOtoEntity(entityDTO: ChampionStatusChangeReasonDTO): ChampionStatusChangeReasonEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new ChampionStatusChangeReasonEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: ChampionStatusChangeReasonEntity): ChampionStatusChangeReasonDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new ChampionStatusChangeReasonDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
