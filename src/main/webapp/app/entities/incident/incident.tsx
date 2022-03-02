// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './incident.reducer';
import { IIncident } from 'app/shared/model/incident.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIncidentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Incident = (props: IIncidentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { incidentList, match, loading } = props;
  return (
    <div>
      <h2 id="incident-heading" data-cy="IncidentHeading">
        <Translate contentKey="championApp.incident.home.title">Incidents</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="championApp.incident.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="championApp.incident.home.createLabel">Create new Incident</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {incidentList && incidentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="championApp.incident.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.incidentAddress">Incident Address</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.reportedOn">Reported On</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.reportedBy">Reported By</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.updatedOn">Updated On</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.resolvedOn">Resolved On</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.reportingComments">Reporting Comments</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.updateStatusComments">Update Status Comments</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.champion">Champion</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.fieldAgent">Field Agent</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.incidentType">Incident Type</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.champion">Champion</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.incident.fieldAgent">Field Agent</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {incidentList.map((incident, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${incident.id}`} color="link" size="sm">
                      {incident.id}
                    </Button>
                  </td>
                  <td>{incident.incidentAddress}</td>
                  <td>
                    <Translate contentKey={`championApp.IncidentStatus.${incident.status}`} />
                  </td>
                  <td>
                    {incident.reportedOn ? <TextFormat type="date" value={incident.reportedOn} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{incident.reportedBy}</td>
                  <td>
                    {incident.updatedOn ? <TextFormat type="date" value={incident.updatedOn} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{incident.updatedBy}</td>
                  <td>
                    {incident.resolvedOn ? <TextFormat type="date" value={incident.resolvedOn} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{incident.reportingComments}</td>
                  <td>{incident.updateStatusComments}</td>
                  <td>{incident.champion ? <Link to={`champion/${incident.champion.id}`}>{incident.champion.maxChampionId}</Link> : ''}</td>
                  <td>{incident.fieldAgent ? <Link to={`field-agent/${incident.fieldAgent.id}`}>{incident.fieldAgent.id}</Link> : ''}</td>
                  <td>
                    {incident.incidentType ? <Link to={`incident-type/${incident.incidentType.id}`}>{incident.incidentType.id}</Link> : ''}
                  </td>
                  <td>{incident.champion ? <Link to={`champion/${incident.champion.id}`}>{incident.champion.maxChampionId}</Link> : ''}</td>
                  <td>{incident.fieldAgent ? <Link to={`field-agent/${incident.fieldAgent.id}`}>{incident.fieldAgent.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${incident.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${incident.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${incident.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="championApp.incident.home.notFound">No Incidents found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ incident }: IRootState) => ({
  incidentList: incident.entities,
  loading: incident.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Incident);
