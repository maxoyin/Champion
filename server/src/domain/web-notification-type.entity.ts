/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A WebNotificationTypeEntity.
 */
@Entity('web_notification_type')
export class WebNotificationTypeEntity extends BaseEntity {
  /**
   * Current set of valid values are churn_request, contract_paused
   */

  @Column({ name: 'type' })
  type: string;

  /**
   * Current set of valid values are Churn request, Contract Pause
   */

  @Column({ name: 'display_name' })
  displayName: string;

  /**
   * Display text below type pf request. Example Contract has been paused from LAMS
   */

  @Column({ name: 'one_liner_note' })
  oneLinerNote: string;

  /**
   * Note that is displayed when notification detail screen is opened
   */

  @Column({ name: 'detailed_note' })
  detailedNote: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
