/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A IncidentTypeDTO object.
 */
export class IncidentTypeDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'incidentTypeCode field' })
  incidentTypeCode: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'incidentTypeDisplayName field' })
  incidentTypeDisplayName: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
