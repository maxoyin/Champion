/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ChampionEntity } from './champion.entity';
import { FieldAgentEntity } from './field-agent.entity';
import { IncidentTypeEntity } from './incident-type.entity';
import { IncidentStatus } from './enumeration/incident-status';

/**
 * champion, FieldAgent, incident has relation.
 */
@Entity('incident')
export class IncidentEntity extends BaseEntity {
  @Column({ name: 'incident_address' })
  incidentAddress: string;

  @Column({ type: 'simple-enum', name: 'status', enum: IncidentStatus })
  status: IncidentStatus;

  @Column({ type: 'date', name: 'reported_on' })
  reportedOn: any;

  /**
   * Email of reported by user from account service
   */

  @Column({ name: 'reported_by' })
  reportedBy: string;

  @Column({ type: 'date', name: 'updated_on', nullable: true })
  updatedOn: any;

  /**
   * Email of user from account service
   */
  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;

  @Column({ type: 'date', name: 'resolved_on', nullable: true })
  resolvedOn: any;

  @Column({ name: 'reporting_comments', nullable: true })
  reportingComments: string;

  @Column({ name: 'update_status_comments', nullable: true })
  updateStatusComments: string;

  @ManyToOne(type => ChampionEntity)
  champion: ChampionEntity;

  @ManyToOne(type => FieldAgentEntity)
  fieldAgent: FieldAgentEntity;

  @ManyToOne(type => IncidentTypeEntity)
  incidentType: IncidentTypeEntity;


  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
