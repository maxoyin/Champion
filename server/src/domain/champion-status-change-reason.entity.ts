/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ChampionStatus } from './enumeration/champion-status';

/**
 * This entity holds master data of reasons that needs to be captured when champion status is changed
 */
@Entity('champion_status_change_reason')
export class ChampionStatusChangeReasonEntity extends BaseEntity {
  @Column({ name: 'reason' })
  reason: string;

  @Column({ type: 'simple-enum', name: 'reason_for_champion_status', enum: ChampionStatus })
  reasonForChampionStatus: ChampionStatus;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
