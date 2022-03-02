import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IChampion } from 'app/shared/model/champion.model';
import { getEntities as getChampions } from 'app/entities/champion/champion.reducer';
import { IFieldAgent } from 'app/shared/model/field-agent.model';
import { getEntities as getFieldAgents } from 'app/entities/field-agent/field-agent.reducer';
import { IIncidentType } from 'app/shared/model/incident-type.model';
import { getEntities as getIncidentTypes } from 'app/entities/incident-type/incident-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './incident.reducer';
import { IIncident } from 'app/shared/model/incident.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIncidentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IncidentUpdate = (props: IIncidentUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { incidentEntity, champions, fieldAgents, incidentTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/incident');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getChampions();
    props.getFieldAgents();
    props.getIncidentTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...incidentEntity,
        ...values,
        champion: champions.find(it => it.id.toString() === values.championId.toString()),
        champion: champions.find(it => it.id.toString() === values.championId.toString()),
        fieldAgent: fieldAgents.find(it => it.id.toString() === values.fieldAgentId.toString()),
        fieldAgent: fieldAgents.find(it => it.id.toString() === values.fieldAgentId.toString()),
        incidentType: incidentTypes.find(it => it.id.toString() === values.incidentTypeId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="championApp.incident.home.createOrEditLabel" data-cy="IncidentCreateUpdateHeading">
            <Translate contentKey="championApp.incident.home.createOrEditLabel">Create or edit a Incident</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : incidentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="incident-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="incident-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="incidentAddressLabel" for="incident-incidentAddress">
                  <Translate contentKey="championApp.incident.incidentAddress">Incident Address</Translate>
                </Label>
                <AvField
                  id="incident-incidentAddress"
                  data-cy="incidentAddress"
                  type="text"
                  name="incidentAddress"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="incident-status">
                  <Translate contentKey="championApp.incident.status">Status</Translate>
                </Label>
                <AvInput
                  id="incident-status"
                  data-cy="status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && incidentEntity.status) || 'PENDING'}
                >
                  <option value="PENDING">{translate('championApp.IncidentStatus.PENDING')}</option>
                  <option value="RESOLVED">{translate('championApp.IncidentStatus.RESOLVED')}</option>
                  <option value="UNRESOLVED">{translate('championApp.IncidentStatus.UNRESOLVED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="reportedOnLabel" for="incident-reportedOn">
                  <Translate contentKey="championApp.incident.reportedOn">Reported On</Translate>
                </Label>
                <AvField
                  id="incident-reportedOn"
                  data-cy="reportedOn"
                  type="date"
                  className="form-control"
                  name="reportedOn"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="reportedByLabel" for="incident-reportedBy">
                  <Translate contentKey="championApp.incident.reportedBy">Reported By</Translate>
                </Label>
                <AvField
                  id="incident-reportedBy"
                  data-cy="reportedBy"
                  type="text"
                  name="reportedBy"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="reportedByLabel">
                  <Translate contentKey="championApp.incident.help.reportedBy" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="updatedOnLabel" for="incident-updatedOn">
                  <Translate contentKey="championApp.incident.updatedOn">Updated On</Translate>
                </Label>
                <AvField id="incident-updatedOn" data-cy="updatedOn" type="date" className="form-control" name="updatedOn" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="incident-updatedBy">
                  <Translate contentKey="championApp.incident.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="incident-updatedBy" data-cy="updatedBy" type="text" name="updatedBy" />
                <UncontrolledTooltip target="updatedByLabel">
                  <Translate contentKey="championApp.incident.help.updatedBy" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="resolvedOnLabel" for="incident-resolvedOn">
                  <Translate contentKey="championApp.incident.resolvedOn">Resolved On</Translate>
                </Label>
                <AvField id="incident-resolvedOn" data-cy="resolvedOn" type="date" className="form-control" name="resolvedOn" />
              </AvGroup>
              <AvGroup>
                <Label id="reportingCommentsLabel" for="incident-reportingComments">
                  <Translate contentKey="championApp.incident.reportingComments">Reporting Comments</Translate>
                </Label>
                <AvField id="incident-reportingComments" data-cy="reportingComments" type="text" name="reportingComments" />
              </AvGroup>
              <AvGroup>
                <Label id="updateStatusCommentsLabel" for="incident-updateStatusComments">
                  <Translate contentKey="championApp.incident.updateStatusComments">Update Status Comments</Translate>
                </Label>
                <AvField id="incident-updateStatusComments" data-cy="updateStatusComments" type="text" name="updateStatusComments" />
              </AvGroup>
              <AvGroup>
                <Label for="incident-champion">
                  <Translate contentKey="championApp.incident.champion">Champion</Translate>
                </Label>
                <AvInput id="incident-champion" data-cy="champion" type="select" className="form-control" name="championId">
                  <option value="" key="0" />
                  {champions
                    ? champions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.maxChampionId}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="incident-fieldAgent">
                  <Translate contentKey="championApp.incident.fieldAgent">Field Agent</Translate>
                </Label>
                <AvInput id="incident-fieldAgent" data-cy="fieldAgent" type="select" className="form-control" name="fieldAgentId">
                  <option value="" key="0" />
                  {fieldAgents
                    ? fieldAgents.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="incident-incidentType">
                  <Translate contentKey="championApp.incident.incidentType">Incident Type</Translate>
                </Label>
                <AvInput id="incident-incidentType" data-cy="incidentType" type="select" className="form-control" name="incidentTypeId">
                  <option value="" key="0" />
                  {incidentTypes
                    ? incidentTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="incident-champion">
                  <Translate contentKey="championApp.incident.champion">Champion</Translate>
                </Label>
                <AvInput id="incident-champion" data-cy="champion" type="select" className="form-control" name="championId">
                  <option value="" key="0" />
                  {champions
                    ? champions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.maxChampionId}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="incident-fieldAgent">
                  <Translate contentKey="championApp.incident.fieldAgent">Field Agent</Translate>
                </Label>
                <AvInput id="incident-fieldAgent" data-cy="fieldAgent" type="select" className="form-control" name="fieldAgentId">
                  <option value="" key="0" />
                  {fieldAgents
                    ? fieldAgents.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/incident" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  champions: storeState.champion.entities,
  fieldAgents: storeState.fieldAgent.entities,
  incidentTypes: storeState.incidentType.entities,
  incidentEntity: storeState.incident.entity,
  loading: storeState.incident.loading,
  updating: storeState.incident.updating,
  updateSuccess: storeState.incident.updateSuccess,
});

const mapDispatchToProps = {
  getChampions,
  getFieldAgents,
  getIncidentTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IncidentUpdate);
