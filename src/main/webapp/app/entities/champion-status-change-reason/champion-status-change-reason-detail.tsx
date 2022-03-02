import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './champion-status-change-reason.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChampionStatusChangeReasonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChampionStatusChangeReasonDetail = (props: IChampionStatusChangeReasonDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { championStatusChangeReasonEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="championStatusChangeReasonDetailsHeading">
          <Translate contentKey="championApp.championStatusChangeReason.detail.title">ChampionStatusChangeReason</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{championStatusChangeReasonEntity.id}</dd>
          <dt>
            <span id="reason">
              <Translate contentKey="championApp.championStatusChangeReason.reason">Reason</Translate>
            </span>
          </dt>
          <dd>{championStatusChangeReasonEntity.reason}</dd>
          <dt>
            <span id="reasonForChampionStatus">
              <Translate contentKey="championApp.championStatusChangeReason.reasonForChampionStatus">Reason For Champion Status</Translate>
            </span>
          </dt>
          <dd>{championStatusChangeReasonEntity.reasonForChampionStatus}</dd>
        </dl>
        <Button tag={Link} to="/champion-status-change-reason" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/champion-status-change-reason/${championStatusChangeReasonEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ championStatusChangeReason }: IRootState) => ({
  championStatusChangeReasonEntity: championStatusChangeReason.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionStatusChangeReasonDetail);
