/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ChampionStatusChangeReasonEntity } from './champion-status-change-reason.entity';
import { ChampionEntity } from './champion.entity';
import { ChampionStatus } from './enumeration/champion-status';

/**
 * Reason is in many to one mapping
 */
@Entity('champion_status_history')
export class ChampionStatusHistoryEntity extends BaseEntity {
  @Column({ type: 'simple-enum', name: 'status', enum: ChampionStatus })
  status: ChampionStatus;

  @Column({ type: 'date', name: 'status_ended_on', nullable: true })
  statusEndedOn: any;

  @Column({ name: 'comments', nullable: true })
  comments: string;

  /**
   * Start of Inactive days captured when status changed to inactive
   */
  @Column({ type: 'date', name: 'inactive_start_date', nullable: true })
  inactiveStartDate: any;

  /**
   * End of Inactive days captured when status changed to inactive
   */
  @Column({ type: 'date', name: 'inactive_end_date', nullable: true })
  inactiveEndDate: any;

  @ManyToOne(type => ChampionStatusChangeReasonEntity)
  championStatusChangeReason: ChampionStatusChangeReasonEntity;

  @ManyToOne(type => ChampionEntity)
  champion: ChampionEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
