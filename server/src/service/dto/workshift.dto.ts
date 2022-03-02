/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A WorkshiftDTO object.
 */
export class WorkshiftDTO extends BaseDTO {
  /**
   * Values will be Morning, Afternoon and Evening
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Values will be Morning, Afternoon and Evening' })
  code: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'displayName field' })
  displayName: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'startTime field' })
  startTime: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'duration field' })
  duration: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
