/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A WebNotificationTypeDTO object.
 */
export class WebNotificationTypeDTO extends BaseDTO {
  /**
   * Current set of valid values are churn_request, contract_paused
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Current set of valid values are churn_request, contract_paused' })
  type: string;

  /**
   * Current set of valid values are Churn request, Contract Pause
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Current set of valid values are Churn request, Contract Pause' })
  displayName: string;

  /**
   * Display text below type pf request. Example Contract has been paused from LAMS
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Display text below type pf request. Example Contract has been paused from LAMS' })
  oneLinerNote: string;

  /**
   * Note that is displayed when notification detail screen is opened
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Note that is displayed when notification detail screen is opened' })
  detailedNote: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
