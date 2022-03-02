import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './incident.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIncidentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IncidentDetail = (props: IIncidentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { incidentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="incidentDetailsHeading">
          <Translate contentKey="championApp.incident.detail.title">Incident</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{incidentEntity.id}</dd>
          <dt>
            <span id="incidentAddress">
              <Translate contentKey="championApp.incident.incidentAddress">Incident Address</Translate>
            </span>
          </dt>
          <dd>{incidentEntity.incidentAddress}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="championApp.incident.status">Status</Translate>
            </span>
          </dt>
          <dd>{incidentEntity.status}</dd>
          <dt>
            <span id="reportedOn">
              <Translate contentKey="championApp.incident.reportedOn">Reported On</Translate>
            </span>
          </dt>
          <dd>
            {incidentEntity.reportedOn ? <TextFormat value={incidentEntity.reportedOn} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="reportedBy">
              <Translate contentKey="championApp.incident.reportedBy">Reported By</Translate>
            </span>
            <UncontrolledTooltip target="reportedBy">
              <Translate contentKey="championApp.incident.help.reportedBy" />
            </UncontrolledTooltip>
          </dt>
          <dd>{incidentEntity.reportedBy}</dd>
          <dt>
            <span id="updatedOn">
              <Translate contentKey="championApp.incident.updatedOn">Updated On</Translate>
            </span>
          </dt>
          <dd>
            {incidentEntity.updatedOn ? <TextFormat value={incidentEntity.updatedOn} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedBy">
              <Translate contentKey="championApp.incident.updatedBy">Updated By</Translate>
            </span>
            <UncontrolledTooltip target="updatedBy">
              <Translate contentKey="championApp.incident.help.updatedBy" />
            </UncontrolledTooltip>
          </dt>
          <dd>{incidentEntity.updatedBy}</dd>
          <dt>
            <span id="resolvedOn">
              <Translate contentKey="championApp.incident.resolvedOn">Resolved On</Translate>
            </span>
          </dt>
          <dd>
            {incidentEntity.resolvedOn ? <TextFormat value={incidentEntity.resolvedOn} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="reportingComments">
              <Translate contentKey="championApp.incident.reportingComments">Reporting Comments</Translate>
            </span>
          </dt>
          <dd>{incidentEntity.reportingComments}</dd>
          <dt>
            <span id="updateStatusComments">
              <Translate contentKey="championApp.incident.updateStatusComments">Update Status Comments</Translate>
            </span>
          </dt>
          <dd>{incidentEntity.updateStatusComments}</dd>
          <dt>
            <Translate contentKey="championApp.incident.champion">Champion</Translate>
          </dt>
          <dd>{incidentEntity.champion ? incidentEntity.champion.maxChampionId : ''}</dd>
          <dt>
            <Translate contentKey="championApp.incident.fieldAgent">Field Agent</Translate>
          </dt>
          <dd>{incidentEntity.fieldAgent ? incidentEntity.fieldAgent.id : ''}</dd>
          <dt>
            <Translate contentKey="championApp.incident.incidentType">Incident Type</Translate>
          </dt>
          <dd>{incidentEntity.incidentType ? incidentEntity.incidentType.id : ''}</dd>
          <dt>
            <Translate contentKey="championApp.incident.champion">Champion</Translate>
          </dt>
          <dd>{incidentEntity.champion ? incidentEntity.champion.maxChampionId : ''}</dd>
          <dt>
            <Translate contentKey="championApp.incident.fieldAgent">Field Agent</Translate>
          </dt>
          <dd>{incidentEntity.fieldAgent ? incidentEntity.fieldAgent.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/incident" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/incident/${incidentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ incident }: IRootState) => ({
  incidentEntity: incident.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IncidentDetail);
