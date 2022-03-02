import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IWorkshift } from 'app/shared/model/workshift.model';
import { getEntities as getWorkshifts } from 'app/entities/workshift/workshift.reducer';
import { getEntity, updateEntity, createEntity, reset } from './field-agent.reducer';
import { IFieldAgent } from 'app/shared/model/field-agent.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFieldAgentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FieldAgentUpdate = (props: IFieldAgentUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { fieldAgentEntity, workshifts, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/field-agent');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getWorkshifts();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...fieldAgentEntity,
        ...values,
        workshift: workshifts.find(it => it.id.toString() === values.workshiftId.toString()),
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
          <h2 id="championApp.fieldAgent.home.createOrEditLabel" data-cy="FieldAgentCreateUpdateHeading">
            <Translate contentKey="championApp.fieldAgent.home.createOrEditLabel">Create or edit a FieldAgent</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fieldAgentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="field-agent-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="field-agent-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="accountIdLabel" for="field-agent-accountId">
                  <Translate contentKey="championApp.fieldAgent.accountId">Account Id</Translate>
                </Label>
                <AvField
                  id="field-agent-accountId"
                  data-cy="accountId"
                  type="text"
                  name="accountId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="accountIdLabel">
                  <Translate contentKey="championApp.fieldAgent.help.accountId" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="cityIdLabel" for="field-agent-cityId">
                  <Translate contentKey="championApp.fieldAgent.cityId">City Id</Translate>
                </Label>
                <AvField
                  id="field-agent-cityId"
                  data-cy="cityId"
                  type="text"
                  name="cityId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="cityIdLabel">
                  <Translate contentKey="championApp.fieldAgent.help.cityId" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="stateIdLabel" for="field-agent-stateId">
                  <Translate contentKey="championApp.fieldAgent.stateId">State Id</Translate>
                </Label>
                <AvField
                  id="field-agent-stateId"
                  data-cy="stateId"
                  type="text"
                  name="stateId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="stateIdLabel">
                  <Translate contentKey="championApp.fieldAgent.help.stateId" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="updatedOnLabel" for="field-agent-updatedOn">
                  <Translate contentKey="championApp.fieldAgent.updatedOn">Updated On</Translate>
                </Label>
                <AvField id="field-agent-updatedOn" data-cy="updatedOn" type="date" className="form-control" name="updatedOn" />
              </AvGroup>
              <AvGroup>
                <Label for="field-agent-workshift">
                  <Translate contentKey="championApp.fieldAgent.workshift">Workshift</Translate>
                </Label>
                <AvInput id="field-agent-workshift" data-cy="workshift" type="select" className="form-control" name="workshiftId">
                  <option value="" key="0" />
                  {workshifts
                    ? workshifts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/field-agent" replace color="info">
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
  workshifts: storeState.workshift.entities,
  fieldAgentEntity: storeState.fieldAgent.entity,
  loading: storeState.fieldAgent.loading,
  updating: storeState.fieldAgent.updating,
  updateSuccess: storeState.fieldAgent.updateSuccess,
});

const mapDispatchToProps = {
  getWorkshifts,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FieldAgentUpdate);
