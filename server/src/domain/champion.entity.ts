/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ChampionStatusHistoryEntity } from './champion-status-history.entity';
import { ChampionGuarantorEntity } from './champion-guarantor.entity';
import { IncidentEntity } from './incident.entity';
import { ChampionStatus } from './enumeration/champion-status';
import { MaritalStatus } from './enumeration/marital-status';

/**
 * A ChampionEntity.
 */
@Entity('champion')
export class ChampionEntity extends BaseEntity {
  @Column({ name: 'max_champion_id' })
  maxChampionId: string;

  /**
   * generated Prospect Id eg. MAX-ID-534
   */

  @Column({ name: 'prospective_id' })
  prospectiveId: string;

  /**
   * Unique email for the user from account service
   */

  @Column({ name: 'account' })
  account: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ type: 'simple-enum', name: 'status', enum: ChampionStatus })
  status: ChampionStatus;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'email_address', nullable: true })
  emailAddress: string;

  @Column({ type: 'boolean', name: 'has_insurance' })
  hasInsurance: boolean;

  @Column({ type: 'boolean', name: 'has_driver_license' })
  hasDriverLicense: boolean;

  @Column({ type: 'date', name: 'created_on' })
  createdOn: any;

  @Column({ type: 'date', name: 'activated_on' })
  activatedOn: any;

  @Column({ type: 'date', name: 'updated_on' })
  updatedOn: any;

  /**
   * Email of welfare analyst will be stored
   */
  @Column({ name: 'welfare_analyst', nullable: true })
  welfareAnalyst: string;

  @Column({ type: 'simple-enum', name: 'marital_status', enum: MaritalStatus })
  maritalStatus: MaritalStatus;

  @Column({ name: 'state_of_origin', nullable: true })
  stateOfOrigin: string;

  @Column({ name: 'state_of_birth', nullable: true })
  stateOfBirth: string;

  @Column({ name: 'bank_name', nullable: true })
  bankName: string;

  @Column({ name: 'bank_account_number', nullable: true })
  bankAccountNumber: string;

  @Column({ name: 'bank_account_name', nullable: true })
  bankAccountName: string;

  @Column({ name: 'neat_of_kin_name', nullable: true })
  neatOfKinName: string;

  @Column({ name: 'next_of_kin_phone', nullable: true })
  nextOfKinPhone: string;

  @Column({ type: 'date', name: 'date_of_birth', nullable: true })
  dateOfBirth: any;

  @Column({ name: 'bvn', nullable: true })
  bvn: string;

  @Column({ name: 'house_address', nullable: true })
  houseAddress: string;

  @Column({ name: 'emergency_contact_name', nullable: true })
  emergencyContactName: string;

  @Column({ name: 'emergency_contact_number', nullable: true })
  emergencyContactNumber: string;

  @Column({ name: 'entry_channel', nullable: true })
  entryChannel: string;

  @Column({ name: 'hmo_provider', nullable: true })
  hmoProvider: string;

  @Column({ name: 'hmo_number', nullable: true })
  hmoNumber: string;

  /**
   * Check if following properties still needed for Champion
   */
  @Column({ type: 'blob', name: 'meta_json', nullable: true })
  metaJson: any;

  @Column({ name: 'meta_json_content_type', nullable: true })
  metaJsonContentType: string;
  @Column({ type: 'date', name: 'date_engaged', nullable: true })
  dateEngaged: any;

  @Column({ type: 'date', name: 'date_disengaged', nullable: true })
  dateDisengaged: any;

  @Column({ type: 'integer', name: 'rating', nullable: true })
  rating: number;

  @Column({ name: 'helmet_number', nullable: true })
  helmetNumber: string;

  @Column({ name: 'registration_number', nullable: true })
  registrationNumber: string;

  @Column({ name: 'phone_brand', nullable: true })
  phoneBrand: string;

  @Column({ name: 'phone_ime_number', nullable: true })
  phoneImeNumber: string;

  @Column({ name: 'contractor_id', nullable: true })
  contractorId: string;

  @Column({ name: 'service_id', nullable: true })
  serviceId: string;

  @Column({ name: 'package_id', nullable: true })
  packageId: string;

  @Column({ name: 'delivery_service_id', nullable: true })
  deliveryServiceId: string;

  @Column({ name: 'status_id', nullable: true })
  statusId: string;

  @Column({ name: 'reason_id', nullable: true })
  reasonId: string;

  @OneToMany(type => ChampionStatusHistoryEntity, other => other.champion)
  championStatusHistories: ChampionStatusHistoryEntity[];

  @OneToMany(type => ChampionGuarantorEntity, other => other.champion)
  championGuarantors: ChampionGuarantorEntity[];

  @OneToMany(type => IncidentEntity, other => other.champion)
  incidents: IncidentEntity[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
