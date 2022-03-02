import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './web-notification-type.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWebNotificationTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WebNotificationTypeDetail = (props: IWebNotificationTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { webNotificationTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="webNotificationTypeDetailsHeading">
          <Translate contentKey="championApp.webNotificationType.detail.title">WebNotificationType</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{webNotificationTypeEntity.id}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="championApp.webNotificationType.type">Type</Translate>
            </span>
            <UncontrolledTooltip target="type">
              <Translate contentKey="championApp.webNotificationType.help.type" />
            </UncontrolledTooltip>
          </dt>
          <dd>{webNotificationTypeEntity.type}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="championApp.webNotificationType.displayName">Display Name</Translate>
            </span>
            <UncontrolledTooltip target="displayName">
              <Translate contentKey="championApp.webNotificationType.help.displayName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{webNotificationTypeEntity.displayName}</dd>
          <dt>
            <span id="oneLinerNote">
              <Translate contentKey="championApp.webNotificationType.oneLinerNote">One Liner Note</Translate>
            </span>
            <UncontrolledTooltip target="oneLinerNote">
              <Translate contentKey="championApp.webNotificationType.help.oneLinerNote" />
            </UncontrolledTooltip>
          </dt>
          <dd>{webNotificationTypeEntity.oneLinerNote}</dd>
          <dt>
            <span id="detailedNote">
              <Translate contentKey="championApp.webNotificationType.detailedNote">Detailed Note</Translate>
            </span>
            <UncontrolledTooltip target="detailedNote">
              <Translate contentKey="championApp.webNotificationType.help.detailedNote" />
            </UncontrolledTooltip>
          </dt>
          <dd>{webNotificationTypeEntity.detailedNote}</dd>
        </dl>
        <Button tag={Link} to="/web-notification-type" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/web-notification-type/${webNotificationTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ webNotificationType }: IRootState) => ({
  webNotificationTypeEntity: webNotificationType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WebNotificationTypeDetail);
