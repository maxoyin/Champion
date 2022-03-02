// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './workshift.reducer';
import { IWorkshift } from 'app/shared/model/workshift.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWorkshiftProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Workshift = (props: IWorkshiftProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { workshiftList, match, loading } = props;
  return (
    <div>
      <h2 id="workshift-heading" data-cy="WorkshiftHeading">
        <Translate contentKey="championApp.workshift.home.title">Workshifts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="championApp.workshift.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="championApp.workshift.home.createLabel">Create new Workshift</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {workshiftList && workshiftList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="championApp.workshift.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.workshift.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.workshift.displayName">Display Name</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.workshift.startTime">Start Time</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.workshift.duration">Duration</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {workshiftList.map((workshift, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${workshift.id}`} color="link" size="sm">
                      {workshift.id}
                    </Button>
                  </td>
                  <td>{workshift.code}</td>
                  <td>{workshift.displayName}</td>
                  <td>{workshift.startTime}</td>
                  <td>{workshift.duration}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${workshift.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${workshift.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${workshift.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="championApp.workshift.home.notFound">No Workshifts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ workshift }: IRootState) => ({
  workshiftList: workshift.entities,
  loading: workshift.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Workshift);
