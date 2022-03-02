import { ChampionStatusHistoryEntity } from '../../domain/champion-status-history.entity';
import { ChampionStatusHistoryDTO } from '../dto/champion-status-history.dto';

/**
 * A ChampionStatusHistory mapper object.
 */
export class ChampionStatusHistoryMapper {
  static fromDTOtoEntity(entityDTO: ChampionStatusHistoryDTO): ChampionStatusHistoryEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new ChampionStatusHistoryEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: ChampionStatusHistoryEntity): ChampionStatusHistoryDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new ChampionStatusHistoryDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
