/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { WebNotificationTypeDTO } from './web-notification-type.dto';
import { ChampionDTO } from './champion.dto';
import { WebNotificationStatus } from '../../domain/enumeration/web-notification-status';

/**
 * A WebNotificationDTO object.
 */
export class WebNotificationDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ enum: WebNotificationStatus, description: 'status enum field' })
  status: WebNotificationStatus;

  @ApiModelProperty({ description: 'requestPayload field', required: false })
  requestPayload: string;

  @ApiModelProperty({ description: 'updatedOn field', required: false })
  updatedOn: any;

  /**
   * Email of user from account service
   */
  @ApiModelProperty({ description: 'Email of user from account service', required: false })
  updatedBy: string;

  @ApiModelProperty({ description: 'closedOn field', required: false })
  closedOn: any;

  /**
   * Email of user from account service
   */
  @ApiModelProperty({ description: 'Email of user from account service', required: false })
  closedBy: string;

  @ApiModelProperty({ type: WebNotificationTypeDTO, description: 'webNotificationType relationship' })
  webNotificationType: WebNotificationTypeDTO;

  @ApiModelProperty({ type: ChampionDTO, description: 'champion relationship' })
  champion: ChampionDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
