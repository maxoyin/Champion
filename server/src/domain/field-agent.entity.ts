/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { IncidentEntity } from './incident.entity';
import { WorkshiftEntity } from './workshift.entity';

/**
 * Workshift is many to one
 */
@Entity('field_agent')
export class FieldAgentEntity extends BaseEntity {
  /**
   * Email of agent
   */

  @Column({ name: 'account_id' })
  accountId: string;

  /**
   * Shared resource
   */

  @Column({ name: 'city_id' })
  cityId: string;

  /**
   * Shared resource
   */

  @Column({ name: 'state_id' })
  stateId: string;

  @Column({ type: 'date', name: 'updated_on', nullable: true })
  updatedOn: any;

  @OneToMany(type => IncidentEntity, other => other.fieldAgent)
  incidents: IncidentEntity[];

  @ManyToOne(type => WorkshiftEntity)
  workshift: WorkshiftEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
