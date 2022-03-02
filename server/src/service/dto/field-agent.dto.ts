/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { IncidentDTO } from './incident.dto';
import { WorkshiftDTO } from './workshift.dto';

/**
 * A FieldAgentDTO object.
 */
export class FieldAgentDTO extends BaseDTO {
  /**
   * Email of agent
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Email of agent' })
  accountId: string;

  /**
   * Shared resource
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Shared resource' })
  cityId: string;

  /**
   * Shared resource
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Shared resource' })
  stateId: string;

  @ApiModelProperty({ description: 'updatedOn field', required: false })
  updatedOn: any;

  @ApiModelProperty({ type: IncidentDTO, isArray: true, description: 'incidents relationship' })
  incidents: IncidentDTO[];

  @ApiModelProperty({ type: WorkshiftDTO, description: 'workshift relationship' })
  workshift: WorkshiftDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
