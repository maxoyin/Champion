import { ChampionGuarantorEntity } from '../../domain/champion-guarantor.entity';
import { ChampionGuarantorDTO } from '../dto/champion-guarantor.dto';

/**
 * A ChampionGuarantor mapper object.
 */
export class ChampionGuarantorMapper {
  static fromDTOtoEntity(entityDTO: ChampionGuarantorDTO): ChampionGuarantorEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new ChampionGuarantorEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: ChampionGuarantorEntity): ChampionGuarantorDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new ChampionGuarantorDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
