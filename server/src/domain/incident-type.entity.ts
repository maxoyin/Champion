/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A IncidentTypeEntity.
 */
@Entity('incident_type')
export class IncidentTypeEntity extends BaseEntity {
  @Column({ name: 'incident_type_code' })
  incidentTypeCode: string;

  @Column({ name: 'incident_type_display_name' })
  incidentTypeDisplayName: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
