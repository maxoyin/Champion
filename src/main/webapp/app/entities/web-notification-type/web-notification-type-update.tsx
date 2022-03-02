import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './web-notification-type.reducer';
import { IWebNotificationType } from 'app/shared/model/web-notification-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IWebNotificationTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WebNotificationTypeUpdate = (props: IWebNotificationTypeUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { webNotificationTypeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/web-notification-type');
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
        ...webNotificationTypeEntity,
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
          <h2 id="championApp.webNotificationType.home.createOrEditLabel" data-cy="WebNotificationTypeCreateUpdateHeading">
            <Translate contentKey="championApp.webNotificationType.home.createOrEditLabel">Create or edit a WebNotificationType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : webNotificationTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="web-notification-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="web-notification-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeLabel" for="web-notification-type-type">
                  <Translate contentKey="championApp.webNotificationType.type">Type</Translate>
                </Label>
                <AvField
                  id="web-notification-type-type"
                  data-cy="type"
                  type="text"
                  name="type"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="typeLabel">
                  <Translate contentKey="championApp.webNotificationType.help.type" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="displayNameLabel" for="web-notification-type-displayName">
                  <Translate contentKey="championApp.webNotificationType.displayName">Display Name</Translate>
                </Label>
                <AvField
                  id="web-notification-type-displayName"
                  data-cy="displayName"
                  type="text"
                  name="displayName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="displayNameLabel">
                  <Translate contentKey="championApp.webNotificationType.help.displayName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="oneLinerNoteLabel" for="web-notification-type-oneLinerNote">
                  <Translate contentKey="championApp.webNotificationType.oneLinerNote">One Liner Note</Translate>
                </Label>
                <AvField
                  id="web-notification-type-oneLinerNote"
                  data-cy="oneLinerNote"
                  type="text"
                  name="oneLinerNote"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="oneLinerNoteLabel">
                  <Translate contentKey="championApp.webNotificationType.help.oneLinerNote" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="detailedNoteLabel" for="web-notification-type-detailedNote">
                  <Translate contentKey="championApp.webNotificationType.detailedNote">Detailed Note</Translate>
                </Label>
                <AvField
                  id="web-notification-type-detailedNote"
                  data-cy="detailedNote"
                  type="text"
                  name="detailedNote"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="detailedNoteLabel">
                  <Translate contentKey="championApp.webNotificationType.help.detailedNote" />
                </UncontrolledTooltip>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/web-notification-type" replace color="info">
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
  webNotificationTypeEntity: storeState.webNotificationType.entity,
  loading: storeState.webNotificationType.loading,
  updating: storeState.webNotificationType.updating,
  updateSuccess: storeState.webNotificationType.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WebNotificationTypeUpdate);
