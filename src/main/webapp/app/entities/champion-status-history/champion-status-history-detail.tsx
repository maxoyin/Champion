import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './champion-status-history.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChampionStatusHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChampionStatusHistoryDetail = (props: IChampionStatusHistoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { championStatusHistoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="championStatusHistoryDetailsHeading">
          <Translate contentKey="championApp.championStatusHistory.detail.title">ChampionStatusHistory</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{championStatusHistoryEntity.id}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="championApp.championStatusHistory.status">Status</Translate>
            </span>
          </dt>
          <dd>{championStatusHistoryEntity.status}</dd>
          <dt>
            <span id="statusEndedOn">
              <Translate contentKey="championApp.championStatusHistory.statusEndedOn">Status Ended On</Translate>
            </span>
          </dt>
          <dd>
            {championStatusHistoryEntity.statusEndedOn ? (
              <TextFormat value={championStatusHistoryEntity.statusEndedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="comments">
              <Translate contentKey="championApp.championStatusHistory.comments">Comments</Translate>
            </span>
          </dt>
          <dd>{championStatusHistoryEntity.comments}</dd>
          <dt>
            <span id="inactiveStartDate">
              <Translate contentKey="championApp.championStatusHistory.inactiveStartDate">Inactive Start Date</Translate>
            </span>
            <UncontrolledTooltip target="inactiveStartDate">
              <Translate contentKey="championApp.championStatusHistory.help.inactiveStartDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {championStatusHistoryEntity.inactiveStartDate ? (
              <TextFormat value={championStatusHistoryEntity.inactiveStartDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="inactiveEndDate">
              <Translate contentKey="championApp.championStatusHistory.inactiveEndDate">Inactive End Date</Translate>
            </span>
            <UncontrolledTooltip target="inactiveEndDate">
              <Translate contentKey="championApp.championStatusHistory.help.inactiveEndDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {championStatusHistoryEntity.inactiveEndDate ? (
              <TextFormat value={championStatusHistoryEntity.inactiveEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="championApp.championStatusHistory.championStatusChangeReason">Champion Status Change Reason</Translate>
          </dt>
          <dd>{championStatusHistoryEntity.championStatusChangeReason ? championStatusHistoryEntity.championStatusChangeReason.id : ''}</dd>
          <dt>
            <Translate contentKey="championApp.championStatusHistory.champion">Champion</Translate>
          </dt>
          <dd>{championStatusHistoryEntity.champion ? championStatusHistoryEntity.champion.maxChampionId : ''}</dd>
        </dl>
        <Button tag={Link} to="/champion-status-history" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/champion-status-history/${championStatusHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ championStatusHistory }: IRootState) => ({
  championStatusHistoryEntity: championStatusHistory.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionStatusHistoryDetail);
