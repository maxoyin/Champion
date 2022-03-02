import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './workshift.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWorkshiftDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WorkshiftDetail = (props: IWorkshiftDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { workshiftEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="workshiftDetailsHeading">
          <Translate contentKey="championApp.workshift.detail.title">Workshift</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{workshiftEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="championApp.workshift.code">Code</Translate>
            </span>
            <UncontrolledTooltip target="code">
              <Translate contentKey="championApp.workshift.help.code" />
            </UncontrolledTooltip>
          </dt>
          <dd>{workshiftEntity.code}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="championApp.workshift.displayName">Display Name</Translate>
            </span>
          </dt>
          <dd>{workshiftEntity.displayName}</dd>
          <dt>
            <span id="startTime">
              <Translate contentKey="championApp.workshift.startTime">Start Time</Translate>
            </span>
          </dt>
          <dd>{workshiftEntity.startTime}</dd>
          <dt>
            <span id="duration">
              <Translate contentKey="championApp.workshift.duration">Duration</Translate>
            </span>
          </dt>
          <dd>{workshiftEntity.duration}</dd>
        </dl>
        <Button tag={Link} to="/workshift" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/workshift/${workshiftEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ workshift }: IRootState) => ({
  workshiftEntity: workshift.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkshiftDetail);
