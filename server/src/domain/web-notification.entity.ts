/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { WebNotificationTypeEntity } from './web-notification-type.entity';
import { ChampionEntity } from './champion.entity';
import { WebNotificationStatus } from './enumeration/web-notification-status';

/**
 * notificationType, Champion is relation
 */
@Entity('web_notification')
export class WebNotificationEntity extends BaseEntity {
  @Column({ type: 'simple-enum', name: 'status', enum: WebNotificationStatus })
  status: WebNotificationStatus;

  @Column({ name: 'request_payload', nullable: true })
  requestPayload: string;

  @Column({ type: 'date', name: 'updated_on', nullable: true })
  updatedOn: any;

  /**
   * Email of user from account service
   */
  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;

  @Column({ type: 'date', name: 'closed_on', nullable: true })
  closedOn: any;

  /**
   * Email of user from account service
   */
  @Column({ name: 'closed_by', nullable: true })
  closedBy: string;

  @ManyToOne(type => WebNotificationTypeEntity)
  webNotificationType: WebNotificationTypeEntity;

  @ManyToOne(type => ChampionEntity)
  champion: ChampionEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
