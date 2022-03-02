import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './web-notification.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWebNotificationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WebNotificationDetail = (props: IWebNotificationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { webNotificationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="webNotificationDetailsHeading">
          <Translate contentKey="championApp.webNotification.detail.title">WebNotification</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{webNotificationEntity.id}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="championApp.webNotification.status">Status</Translate>
            </span>
          </dt>
          <dd>{webNotificationEntity.status}</dd>
          <dt>
            <span id="requestPayload">
              <Translate contentKey="championApp.webNotification.requestPayload">Request Payload</Translate>
            </span>
          </dt>
          <dd>{webNotificationEntity.requestPayload}</dd>
          <dt>
            <span id="updatedOn">
              <Translate contentKey="championApp.webNotification.updatedOn">Updated On</Translate>
            </span>
          </dt>
          <dd>
            {webNotificationEntity.updatedOn ? (
              <TextFormat value={webNotificationEntity.updatedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="championApp.webNotification.updatedBy">Updated By</Translate>
            </span>
            <UncontrolledTooltip target="updatedBy">
              <Translate contentKey="championApp.webNotification.help.updatedBy" />
            </UncontrolledTooltip>
          </dt>
          <dd>{webNotificationEntity.updatedBy}</dd>
          <dt>
            <span id="closedOn">
              <Translate contentKey="championApp.webNotification.closedOn">Closed On</Translate>
            </span>
          </dt>
          <dd>
            {webNotificationEntity.closedOn ? (
              <TextFormat value={webNotificationEntity.closedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="closedBy">
              <Translate contentKey="championApp.webNotification.closedBy">Closed By</Translate>
            </span>
            <UncontrolledTooltip target="closedBy">
              <Translate contentKey="championApp.webNotification.help.closedBy" />
            </UncontrolledTooltip>
          </dt>
          <dd>{webNotificationEntity.closedBy}</dd>
          <dt>
            <Translate contentKey="championApp.webNotification.webNotificationType">Web Notification Type</Translate>
          </dt>
          <dd>{webNotificationEntity.webNotificationType ? webNotificationEntity.webNotificationType.id : ''}</dd>
          <dt>
            <Translate contentKey="championApp.webNotification.champion">Champion</Translate>
          </dt>
          <dd>{webNotificationEntity.champion ? webNotificationEntity.champion.maxChampionId : ''}</dd>
        </dl>
        <Button tag={Link} to="/web-notification" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/web-notification/${webNotificationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ webNotification }: IRootState) => ({
  webNotificationEntity: webNotification.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WebNotificationDetail);
