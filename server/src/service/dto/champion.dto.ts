/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ChampionStatusHistoryDTO } from './champion-status-history.dto';
import { ChampionGuarantorDTO } from './champion-guarantor.dto';
import { IncidentDTO } from './incident.dto';
import { ChampionStatus } from '../../domain/enumeration/champion-status';
import { MaritalStatus } from '../../domain/enumeration/marital-status';

/**
 * A ChampionDTO object.
 */
export class ChampionDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'maxChampionId field' })
  maxChampionId: string;

  /**
   * generated Prospect Id eg. MAX-ID-534
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'generated Prospect Id eg. MAX-ID-534' })
  prospectiveId: string;

  /**
   * Unique email for the user from account service
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Unique email for the user from account service' })
  account: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'firstName field' })
  firstName: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'lastName field' })
  lastName: string;

  @ApiModelProperty({ description: 'middleName field', required: false })
  middleName: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'phoneNumber field' })
  phoneNumber: string;

  @IsNotEmpty()
  @ApiModelProperty({ enum: ChampionStatus, description: 'status enum field' })
  status: ChampionStatus;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'city field' })
  city: string;

  @ApiModelProperty({ description: 'emailAddress field', required: false })
  emailAddress: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'hasInsurance field' })
  hasInsurance: boolean;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'hasDriverLicense field' })
  hasDriverLicense: boolean;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'createdOn field' })
  createdOn: any;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'activatedOn field' })
  activatedOn: any;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'updatedOn field' })
  updatedOn: any;

  /**
   * Email of welfare analyst will be stored
   */
  @ApiModelProperty({ description: 'Email of welfare analyst will be stored', required: false })
  welfareAnalyst: string;

  @ApiModelProperty({ enum: MaritalStatus, description: 'maritalStatus enum field', required: false })
  maritalStatus: MaritalStatus;

  @ApiModelProperty({ description: 'stateOfOrigin field', required: false })
  stateOfOrigin: string;

  @ApiModelProperty({ description: 'stateOfBirth field', required: false })
  stateOfBirth: string;

  @ApiModelProperty({ description: 'bankName field', required: false })
  bankName: string;

  @ApiModelProperty({ description: 'bankAccountNumber field', required: false })
  bankAccountNumber: string;

  @ApiModelProperty({ description: 'bankAccountName field', required: false })
  bankAccountName: string;

  @ApiModelProperty({ description: 'neatOfKinName field', required: false })
  neatOfKinName: string;

  @ApiModelProperty({ description: 'nextOfKinPhone field', required: false })
  nextOfKinPhone: string;

  @ApiModelProperty({ description: 'dateOfBirth field', required: false })
  dateOfBirth: any;

  @ApiModelProperty({ description: 'bvn field', required: false })
  bvn: string;

  @ApiModelProperty({ description: 'houseAddress field', required: false })
  houseAddress: string;

  @ApiModelProperty({ description: 'emergencyContactName field', required: false })
  emergencyContactName: string;

  @ApiModelProperty({ description: 'emergencyContactNumber field', required: false })
  emergencyContactNumber: string;

  @ApiModelProperty({ description: 'entryChannel field', required: false })
  entryChannel: string;

  @ApiModelProperty({ description: 'hmoProvider field', required: false })
  hmoProvider: string;

  @ApiModelProperty({ description: 'hmoNumber field', required: false })
  hmoNumber: string;

  /**
   * Check if following properties still needed for Champion
   */
  @ApiModelProperty({ description: 'Check if following properties still needed for Champion', required: false })
  metaJson: any;

  metaJsonContentType: string;
  @ApiModelProperty({ description: 'dateEngaged field', required: false })
  dateEngaged: any;

  @ApiModelProperty({ description: 'dateDisengaged field', required: false })
  dateDisengaged: any;

  @ApiModelProperty({ description: 'rating field', required: false })
  rating: number;

  @ApiModelProperty({ description: 'helmetNumber field', required: false })
  helmetNumber: string;

  @ApiModelProperty({ description: 'registrationNumber field', required: false })
  registrationNumber: string;

  @ApiModelProperty({ description: 'phoneBrand field', required: false })
  phoneBrand: string;

  @ApiModelProperty({ description: 'phoneImeNumber field', required: false })
  phoneImeNumber: string;

  @ApiModelProperty({ description: 'contractorId field', required: false })
  contractorId: string;

  @ApiModelProperty({ description: 'serviceId field', required: false })
  serviceId: string;

  @ApiModelProperty({ description: 'packageId field', required: false })
  packageId: string;

  @ApiModelProperty({ description: 'deliveryServiceId field', required: false })
  deliveryServiceId: string;

  @ApiModelProperty({ description: 'statusId field', required: false })
  statusId: string;

  @ApiModelProperty({ description: 'reasonId field', required: false })
  reasonId: string;

  @ApiModelProperty({ type: ChampionStatusHistoryDTO, isArray: true, description: 'championStatusHistories relationship' })
  championStatusHistories: ChampionStatusHistoryDTO[];

  @ApiModelProperty({ type: ChampionGuarantorDTO, isArray: true, description: 'championGuarantors relationship' })
  championGuarantors: ChampionGuarantorDTO[];

  @ApiModelProperty({ type: IncidentDTO, isArray: true, description: 'incidents relationship' })
  incidents: IncidentDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
