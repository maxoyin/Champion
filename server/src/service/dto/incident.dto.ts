/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ChampionDTO } from './champion.dto';
import { FieldAgentDTO } from './field-agent.dto';
import { IncidentTypeDTO } from './incident-type.dto';
import { IncidentStatus } from '../../domain/enumeration/incident-status';

/**
 * A IncidentDTO object.
 */
export class IncidentDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'incidentAddress field' })
  incidentAddress: string;

  @IsNotEmpty()
  @ApiModelProperty({ enum: IncidentStatus, description: 'status enum field' })
  status: IncidentStatus;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'reportedOn field' })
  reportedOn: any;

  /**
   * Email of reported by user from account service
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Email of reported by user from account service' })
  reportedBy: string;

  @ApiModelProperty({ description: 'updatedOn field', required: false })
  updatedOn: any;

  /**
   * Email of user from account service
   */
  @ApiModelProperty({ description: 'Email of user from account service', required: false })
  updatedBy: string;

  @ApiModelProperty({ description: 'resolvedOn field', required: false })
  resolvedOn: any;

  @ApiModelProperty({ description: 'reportingComments field', required: false })
  reportingComments: string;

  @ApiModelProperty({ description: 'updateStatusComments field', required: false })
  updateStatusComments: string;

  @ApiModelProperty({ type: ChampionDTO, description: 'champion relationship' })
  champion: ChampionDTO;

  @ApiModelProperty({ type: FieldAgentDTO, description: 'fieldAgent relationship' })
  fieldAgent: FieldAgentDTO;

  @ApiModelProperty({ type: IncidentTypeDTO, description: 'incidentType relationship' })
  incidentType: IncidentTypeDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
