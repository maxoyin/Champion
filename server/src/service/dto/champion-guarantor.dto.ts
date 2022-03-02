/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ChampionDTO } from './champion.dto';
import { GuarantorsStatus } from '../../domain/enumeration/guarantors-status';

/**
 * A ChampionGuarantorDTO object.
 */
export class ChampionGuarantorDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'firstName field' })
  firstName: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'lastName field' })
  lastName: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'phoneNumber field' })
  phoneNumber: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'address field' })
  address: string;

  @IsNotEmpty()
  @ApiModelProperty({ enum: GuarantorsStatus, description: 'status enum field' })
  status: GuarantorsStatus;

  @ApiModelProperty({ description: 'occupation field', required: false })
  occupation: string;

  @ApiModelProperty({ description: 'updatedOn field', required: false })
  updatedOn: any;

  @ApiModelProperty({ type: ChampionDTO, description: 'champion relationship' })
  champion: ChampionDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
