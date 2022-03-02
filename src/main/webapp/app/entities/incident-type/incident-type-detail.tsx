import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './incident-type.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIncidentTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IncidentTypeDetail = (props: IIncidentTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { incidentTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="incidentTypeDetailsHeading">
          <Translate contentKey="championApp.incidentType.detail.title">IncidentType</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{incidentTypeEntity.id}</dd>
          <dt>
            <span id="incidentTypeCode">
              <Translate contentKey="championApp.incidentType.incidentTypeCode">Incident Type Code</Translate>
            </span>
          </dt>
          <dd>{incidentTypeEntity.incidentTypeCode}</dd>
          <dt>
            <span id="incidentTypeDisplayName">
              <Translate contentKey="championApp.incidentType.incidentTypeDisplayName">Incident Type Display Name</Translate>
            </span>
          </dt>
          <dd>{incidentTypeEntity.incidentTypeDisplayName}</dd>
        </dl>
        <Button tag={Link} to="/incident-type" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/incident-type/${incidentTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ incidentType }: IRootState) => ({
  incidentTypeEntity: incidentType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IncidentTypeDetail);
