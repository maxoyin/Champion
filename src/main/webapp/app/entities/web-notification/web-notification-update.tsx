import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IWebNotificationType } from 'app/shared/model/web-notification-type.model';
import { getEntities as getWebNotificationTypes } from 'app/entities/web-notification-type/web-notification-type.reducer';
import { IChampion } from 'app/shared/model/champion.model';
import { getEntities as getChampions } from 'app/entities/champion/champion.reducer';
import { getEntity, updateEntity, createEntity, reset } from './web-notification.reducer';
import { IWebNotification } from 'app/shared/model/web-notification.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IWebNotificationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WebNotificationUpdate = (props: IWebNotificationUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { webNotificationEntity, webNotificationTypes, champions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/web-notification');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getWebNotificationTypes();
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
        ...webNotificationEntity,
        ...values,
        webNotificationType: webNotificationTypes.find(it => it.id.toString() === values.webNotificationTypeId.toString()),
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
          <h2 id="championApp.webNotification.home.createOrEditLabel" data-cy="WebNotificationCreateUpdateHeading">
            <Translate contentKey="championApp.webNotification.home.createOrEditLabel">Create or edit a WebNotification</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : webNotificationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="web-notification-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="web-notification-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="web-notification-status">
                  <Translate contentKey="championApp.webNotification.status">Status</Translate>
                </Label>
                <AvInput
                  id="web-notification-status"
                  data-cy="status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && webNotificationEntity.status) || 'PENDING'}
                >
                  <option value="PENDING">{translate('championApp.WebNotificationStatus.PENDING')}</option>
                  <option value="COMPLETED">{translate('championApp.WebNotificationStatus.COMPLETED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="requestPayloadLabel" for="web-notification-requestPayload">
                  <Translate contentKey="championApp.webNotification.requestPayload">Request Payload</Translate>
                </Label>
                <AvField id="web-notification-requestPayload" data-cy="requestPayload" type="text" name="requestPayload" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedOnLabel" for="web-notification-updatedOn">
                  <Translate contentKey="championApp.webNotification.updatedOn">Updated On</Translate>
                </Label>
                <AvField id="web-notification-updatedOn" data-cy="updatedOn" type="date" className="form-control" name="updatedOn" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedByLabel" for="web-notification-updatedBy">
                  <Translate contentKey="championApp.webNotification.updatedBy">Updated By</Translate>
                </Label>
                <AvField id="web-notification-updatedBy" data-cy="updatedBy" type="text" name="updatedBy" />
                <UncontrolledTooltip target="updatedByLabel">
                  <Translate contentKey="championApp.webNotification.help.updatedBy" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="closedOnLabel" for="web-notification-closedOn">
                  <Translate contentKey="championApp.webNotification.closedOn">Closed On</Translate>
                </Label>
                <AvField id="web-notification-closedOn" data-cy="closedOn" type="date" className="form-control" name="closedOn" />
              </AvGroup>
              <AvGroup>
                <Label id="closedByLabel" for="web-notification-closedBy">
                  <Translate contentKey="championApp.webNotification.closedBy">Closed By</Translate>
                </Label>
                <AvField id="web-notification-closedBy" data-cy="closedBy" type="text" name="closedBy" />
                <UncontrolledTooltip target="closedByLabel">
                  <Translate contentKey="championApp.webNotification.help.closedBy" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="web-notification-webNotificationType">
                  <Translate contentKey="championApp.webNotification.webNotificationType">Web Notification Type</Translate>
                </Label>
                <AvInput
                  id="web-notification-webNotificationType"
                  data-cy="webNotificationType"
                  type="select"
                  className="form-control"
                  name="webNotificationTypeId"
                >
                  <option value="" key="0" />
                  {webNotificationTypes
                    ? webNotificationTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="web-notification-champion">
                  <Translate contentKey="championApp.webNotification.champion">Champion</Translate>
                </Label>
                <AvInput id="web-notification-champion" data-cy="champion" type="select" className="form-control" name="championId">
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
              <Button tag={Link} id="cancel-save" to="/web-notification" replace color="info">
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
  webNotificationTypes: storeState.webNotificationType.entities,
  champions: storeState.champion.entities,
  webNotificationEntity: storeState.webNotification.entity,
  loading: storeState.webNotification.loading,
  updating: storeState.webNotification.updating,
  updateSuccess: storeState.webNotification.updateSuccess,
});

const mapDispatchToProps = {
  getWebNotificationTypes,
  getChampions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WebNotificationUpdate);
