/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ChampionEntity } from './champion.entity';
import { GuarantorsStatus } from './enumeration/guarantors-status';

/**
 * A ChampionGuarantorEntity.
 */
@Entity('champion_guarantor')
export class ChampionGuarantorEntity extends BaseEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ type: 'simple-enum', name: 'status', enum: GuarantorsStatus })
  status: GuarantorsStatus;

  @Column({ name: 'occupation', nullable: true })
  occupation: string;

  @Column({ type: 'date', name: 'updated_on', nullable: true })
  updatedOn: any;

  @ManyToOne(type => ChampionEntity)
  champion: ChampionEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
