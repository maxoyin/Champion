/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A WorkshiftEntity.
 */
@Entity('workshift')
export class WorkshiftEntity extends BaseEntity {
  /**
   * Values will be Morning, Afternoon and Evening
   */

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ name: 'start_time' })
  startTime: string;

  @Column({ type: 'integer', name: 'duration' })
  duration: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
