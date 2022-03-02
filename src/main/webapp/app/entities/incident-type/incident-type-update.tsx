import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './incident-type.reducer';
import { IIncidentType } from 'app/shared/model/incident-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIncidentTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IncidentTypeUpdate = (props: IIncidentTypeUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { incidentTypeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/incident-type');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...incidentTypeEntity,
        ...values,
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
          <h2 id="championApp.incidentType.home.createOrEditLabel" data-cy="IncidentTypeCreateUpdateHeading">
            <Translate contentKey="championApp.incidentType.home.createOrEditLabel">Create or edit a IncidentType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : incidentTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="incident-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="incident-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="incidentTypeCodeLabel" for="incident-type-incidentTypeCode">
                  <Translate contentKey="championApp.incidentType.incidentTypeCode">Incident Type Code</Translate>
                </Label>
                <AvField
                  id="incident-type-incidentTypeCode"
                  data-cy="incidentTypeCode"
                  type="text"
                  name="incidentTypeCode"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="incidentTypeDisplayNameLabel" for="incident-type-incidentTypeDisplayName">
                  <Translate contentKey="championApp.incidentType.incidentTypeDisplayName">Incident Type Display Name</Translate>
                </Label>
                <AvField
                  id="incident-type-incidentTypeDisplayName"
                  data-cy="incidentTypeDisplayName"
                  type="text"
                  name="incidentTypeDisplayName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/incident-type" replace color="info">
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
  incidentTypeEntity: storeState.incidentType.entity,
  loading: storeState.incidentType.loading,
  updating: storeState.incidentType.updating,
  updateSuccess: storeState.incidentType.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IncidentTypeUpdate);
