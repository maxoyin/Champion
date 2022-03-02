import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './workshift.reducer';
import { IWorkshift } from 'app/shared/model/workshift.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IWorkshiftUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WorkshiftUpdate = (props: IWorkshiftUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { workshiftEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/workshift');
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
        ...workshiftEntity,
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
          <h2 id="championApp.workshift.home.createOrEditLabel" data-cy="WorkshiftCreateUpdateHeading">
            <Translate contentKey="championApp.workshift.home.createOrEditLabel">Create or edit a Workshift</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : workshiftEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="workshift-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="workshift-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="workshift-code">
                  <Translate contentKey="championApp.workshift.code">Code</Translate>
                </Label>
                <AvField
                  id="workshift-code"
                  data-cy="code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="codeLabel">
                  <Translate contentKey="championApp.workshift.help.code" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="displayNameLabel" for="workshift-displayName">
                  <Translate contentKey="championApp.workshift.displayName">Display Name</Translate>
                </Label>
                <AvField
                  id="workshift-displayName"
                  data-cy="displayName"
                  type="text"
                  name="displayName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="startTimeLabel" for="workshift-startTime">
                  <Translate contentKey="championApp.workshift.startTime">Start Time</Translate>
                </Label>
                <AvField
                  id="workshift-startTime"
                  data-cy="startTime"
                  type="text"
                  name="startTime"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="durationLabel" for="workshift-duration">
                  <Translate contentKey="championApp.workshift.duration">Duration</Translate>
                </Label>
                <AvField
                  id="workshift-duration"
                  data-cy="duration"
                  type="string"
                  className="form-control"
                  name="duration"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/workshift" replace color="info">
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
  workshiftEntity: storeState.workshift.entity,
  loading: storeState.workshift.loading,
  updating: storeState.workshift.updating,
  updateSuccess: storeState.workshift.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkshiftUpdate);
