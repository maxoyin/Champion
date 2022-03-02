// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './champion-status-history.reducer';
import { IChampionStatusHistory } from 'app/shared/model/champion-status-history.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChampionStatusHistoryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ChampionStatusHistory = (props: IChampionStatusHistoryProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { championStatusHistoryList, match, loading } = props;
  return (
    <div>
      <h2 id="champion-status-history-heading" data-cy="ChampionStatusHistoryHeading">
        <Translate contentKey="championApp.championStatusHistory.home.title">Champion Status Histories</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="championApp.championStatusHistory.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="championApp.championStatusHistory.home.createLabel">Create new Champion Status History</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {championStatusHistoryList && championStatusHistoryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="championApp.championStatusHistory.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championStatusHistory.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championStatusHistory.statusEndedOn">Status Ended On</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championStatusHistory.comments">Comments</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championStatusHistory.inactiveStartDate">Inactive Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championStatusHistory.inactiveEndDate">Inactive End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championStatusHistory.championStatusChangeReason">
                    Champion Status Change Reason
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championStatusHistory.champion">Champion</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {championStatusHistoryList.map((championStatusHistory, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${championStatusHistory.id}`} color="link" size="sm">
                      {championStatusHistory.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`championApp.ChampionStatus.${championStatusHistory.status}`} />
                  </td>
                  <td>
                    {championStatusHistory.statusEndedOn ? (
                      <TextFormat type="date" value={championStatusHistory.statusEndedOn} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{championStatusHistory.comments}</td>
                  <td>
                    {championStatusHistory.inactiveStartDate ? (
                      <TextFormat type="date" value={championStatusHistory.inactiveStartDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {championStatusHistory.inactiveEndDate ? (
                      <TextFormat type="date" value={championStatusHistory.inactiveEndDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {championStatusHistory.championStatusChangeReason ? (
                      <Link to={`champion-status-change-reason/${championStatusHistory.championStatusChangeReason.id}`}>
                        {championStatusHistory.championStatusChangeReason.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {championStatusHistory.champion ? (
                      <Link to={`champion/${championStatusHistory.champion.id}`}>{championStatusHistory.champion.maxChampionId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${championStatusHistory.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${championStatusHistory.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${championStatusHistory.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
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
              <Translate contentKey="championApp.championStatusHistory.home.notFound">No Champion Status Histories found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ championStatusHistory }: IRootState) => ({
  championStatusHistoryList: championStatusHistory.entities,
  loading: championStatusHistory.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionStatusHistory);
