/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ChampionStatus } from '../../domain/enumeration/champion-status';

/**
 * A ChampionStatusChangeReasonDTO object.
 */
export class ChampionStatusChangeReasonDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'reason field' })
  reason: string;

  @IsNotEmpty()
  @ApiModelProperty({ enum: ChampionStatus, description: 'reasonForChampionStatus enum field' })
  reasonForChampionStatus: ChampionStatus;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
