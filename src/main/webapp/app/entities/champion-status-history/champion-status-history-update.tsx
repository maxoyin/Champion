import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IChampionStatusChangeReason } from 'app/shared/model/champion-status-change-reason.model';
import { getEntities as getChampionStatusChangeReasons } from 'app/entities/champion-status-change-reason/champion-status-change-reason.reducer';
import { IChampion } from 'app/shared/model/champion.model';
import { getEntities as getChampions } from 'app/entities/champion/champion.reducer';
import { getEntity, updateEntity, createEntity, reset } from './champion-status-history.reducer';
import { IChampionStatusHistory } from 'app/shared/model/champion-status-history.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChampionStatusHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChampionStatusHistoryUpdate = (props: IChampionStatusHistoryUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { championStatusHistoryEntity, championStatusChangeReasons, champions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/champion-status-history');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getChampionStatusChangeReasons();
    props.getChampions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...championStatusHistoryEntity,
        ...values,
        championStatusChangeReason: championStatusChangeReasons.find(
          it => it.id.toString() === values.championStatusChangeReasonId.toString()
        ),
        champion: champions.find(it => it.id.toString() === values.championId.toString()),
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
          <h2 id="championApp.championStatusHistory.home.createOrEditLabel" data-cy="ChampionStatusHistoryCreateUpdateHeading">
            <Translate contentKey="championApp.championStatusHistory.home.createOrEditLabel">
              Create or edit a ChampionStatusHistory
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : championStatusHistoryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="champion-status-history-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="champion-status-history-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="champion-status-history-status">
                  <Translate contentKey="championApp.championStatusHistory.status">Status</Translate>
                </Label>
                <AvInput
                  id="champion-status-history-status"
                  data-cy="status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && championStatusHistoryEntity.status) || 'ACTIVE'}
                >
                  <option value="ACTIVE">{translate('championApp.ChampionStatus.ACTIVE')}</option>
                  <option value="INACTIVE">{translate('championApp.ChampionStatus.INACTIVE')}</option>
                  <option value="CHURNED">{translate('championApp.ChampionStatus.CHURNED')}</option>
                  <option value="DEACTIVATED">{translate('championApp.ChampionStatus.DEACTIVATED')}</option>
                  <option value="HPCOMPLETE">{translate('championApp.ChampionStatus.HPCOMPLETE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="statusEndedOnLabel" for="champion-status-history-statusEndedOn">
                  <Translate contentKey="championApp.championStatusHistory.statusEndedOn">Status Ended On</Translate>
                </Label>
                <AvField
                  id="champion-status-history-statusEndedOn"
                  data-cy="statusEndedOn"
                  type="date"
                  className="form-control"
                  name="statusEndedOn"
                />
              </AvGroup>
              <AvGroup>
                <Label id="commentsLabel" for="champion-status-history-comments">
                  <Translate contentKey="championApp.championStatusHistory.comments">Comments</Translate>
                </Label>
                <AvField id="champion-status-history-comments" data-cy="comments" type="text" name="comments" />
              </AvGroup>
              <AvGroup>
                <Label id="inactiveStartDateLabel" for="champion-status-history-inactiveStartDate">
                  <Translate contentKey="championApp.championStatusHistory.inactiveStartDate">Inactive Start Date</Translate>
                </Label>
                <AvField
                  id="champion-status-history-inactiveStartDate"
                  data-cy="inactiveStartDate"
                  type="date"
                  className="form-control"
                  name="inactiveStartDate"
                />
                <UncontrolledTooltip target="inactiveStartDateLabel">
                  <Translate contentKey="championApp.championStatusHistory.help.inactiveStartDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="inactiveEndDateLabel" for="champion-status-history-inactiveEndDate">
                  <Translate contentKey="championApp.championStatusHistory.inactiveEndDate">Inactive End Date</Translate>
                </Label>
                <AvField
                  id="champion-status-history-inactiveEndDate"
                  data-cy="inactiveEndDate"
                  type="date"
                  className="form-control"
                  name="inactiveEndDate"
                />
                <UncontrolledTooltip target="inactiveEndDateLabel">
                  <Translate contentKey="championApp.championStatusHistory.help.inactiveEndDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="champion-status-history-championStatusChangeReason">
                  <Translate contentKey="championApp.championStatusHistory.championStatusChangeReason">
                    Champion Status Change Reason
                  </Translate>
                </Label>
                <AvInput
                  id="champion-status-history-championStatusChangeReason"
                  data-cy="championStatusChangeReason"
                  type="select"
                  className="form-control"
                  name="championStatusChangeReasonId"
                >
                  <option value="" key="0" />
                  {championStatusChangeReasons
                    ? championStatusChangeReasons.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="champion-status-history-champion">
                  <Translate contentKey="championApp.championStatusHistory.champion">Champion</Translate>
                </Label>
                <AvInput id="champion-status-history-champion" data-cy="champion" type="select" className="form-control" name="championId">
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
              <Button tag={Link} id="cancel-save" to="/champion-status-history" replace color="info">
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
  championStatusChangeReasons: storeState.championStatusChangeReason.entities,
  champions: storeState.champion.entities,
  championStatusHistoryEntity: storeState.championStatusHistory.entity,
  loading: storeState.championStatusHistory.loading,
  updating: storeState.championStatusHistory.updating,
  updateSuccess: storeState.championStatusHistory.updateSuccess,
});

const mapDispatchToProps = {
  getChampionStatusChangeReasons,
  getChampions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionStatusHistoryUpdate);
