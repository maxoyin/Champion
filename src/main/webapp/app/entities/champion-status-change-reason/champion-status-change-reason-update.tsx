import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './champion-status-change-reason.reducer';
import { IChampionStatusChangeReason } from 'app/shared/model/champion-status-change-reason.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChampionStatusChangeReasonUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChampionStatusChangeReasonUpdate = (props: IChampionStatusChangeReasonUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { championStatusChangeReasonEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/champion-status-change-reason');
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
        ...championStatusChangeReasonEntity,
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
          <h2 id="championApp.championStatusChangeReason.home.createOrEditLabel" data-cy="ChampionStatusChangeReasonCreateUpdateHeading">
            <Translate contentKey="championApp.championStatusChangeReason.home.createOrEditLabel">
              Create or edit a ChampionStatusChangeReason
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : championStatusChangeReasonEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="champion-status-change-reason-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="champion-status-change-reason-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="reasonLabel" for="champion-status-change-reason-reason">
                  <Translate contentKey="championApp.championStatusChangeReason.reason">Reason</Translate>
                </Label>
                <AvField
                  id="champion-status-change-reason-reason"
                  data-cy="reason"
                  type="text"
                  name="reason"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="reasonForChampionStatusLabel" for="champion-status-change-reason-reasonForChampionStatus">
                  <Translate contentKey="championApp.championStatusChangeReason.reasonForChampionStatus">
                    Reason For Champion Status
                  </Translate>
                </Label>
                <AvInput
                  id="champion-status-change-reason-reasonForChampionStatus"
                  data-cy="reasonForChampionStatus"
                  type="select"
                  className="form-control"
                  name="reasonForChampionStatus"
                  value={(!isNew && championStatusChangeReasonEntity.reasonForChampionStatus) || 'ACTIVE'}
                >
                  <option value="ACTIVE">{translate('championApp.ChampionStatus.ACTIVE')}</option>
                  <option value="INACTIVE">{translate('championApp.ChampionStatus.INACTIVE')}</option>
                  <option value="CHURNED">{translate('championApp.ChampionStatus.CHURNED')}</option>
                  <option value="DEACTIVATED">{translate('championApp.ChampionStatus.DEACTIVATED')}</option>
                  <option value="HPCOMPLETE">{translate('championApp.ChampionStatus.HPCOMPLETE')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/champion-status-change-reason" replace color="info">
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
  championStatusChangeReasonEntity: storeState.championStatusChangeReason.entity,
  loading: storeState.championStatusChangeReason.loading,
  updating: storeState.championStatusChangeReason.updating,
  updateSuccess: storeState.championStatusChangeReason.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionStatusChangeReasonUpdate);
