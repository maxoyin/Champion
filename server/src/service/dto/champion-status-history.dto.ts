/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ChampionStatusChangeReasonDTO } from './champion-status-change-reason.dto';
import { ChampionDTO } from './champion.dto';
import { ChampionStatus } from '../../domain/enumeration/champion-status';

/**
 * A ChampionStatusHistoryDTO object.
 */
export class ChampionStatusHistoryDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ enum: ChampionStatus, description: 'status enum field' })
  status: ChampionStatus;

  @ApiModelProperty({ description: 'statusEndedOn field', required: false })
  statusEndedOn: any;

  @ApiModelProperty({ description: 'comments field', required: false })
  comments: string;

  /**
   * Start of Inactive days captured when status changed to inactive
   */
  @ApiModelProperty({ description: 'Start of Inactive days captured when status changed to inactive', required: false })
  inactiveStartDate: any;

  /**
   * End of Inactive days captured when status changed to inactive
   */
  @ApiModelProperty({ description: 'End of Inactive days captured when status changed to inactive', required: false })
  inactiveEndDate: any;

  @ApiModelProperty({ type: ChampionStatusChangeReasonDTO, description: 'championStatusChangeReason relationship' })
  championStatusChangeReason: ChampionStatusChangeReasonDTO;

  @ApiModelProperty({ type: ChampionDTO, description: 'champion relationship' })
  champion: ChampionDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
