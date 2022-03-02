// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './champion-status-change-reason.reducer';
import { IChampionStatusChangeReason } from 'app/shared/model/champion-status-change-reason.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChampionStatusChangeReasonProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ChampionStatusChangeReason = (props: IChampionStatusChangeReasonProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { championStatusChangeReasonList, match, loading } = props;
  return (
    <div>
      <h2 id="champion-status-change-reason-heading" data-cy="ChampionStatusChangeReasonHeading">
        <Translate contentKey="championApp.championStatusChangeReason.home.title">Champion Status Change Reasons</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="championApp.championStatusChangeReason.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="championApp.championStatusChangeReason.home.createLabel">
              Create new Champion Status Change Reason
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {championStatusChangeReasonList && championStatusChangeReasonList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="championApp.championStatusChangeReason.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championStatusChangeReason.reason">Reason</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championStatusChangeReason.reasonForChampionStatus">
                    Reason For Champion Status
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {championStatusChangeReasonList.map((championStatusChangeReason, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${championStatusChangeReason.id}`} color="link" size="sm">
                      {championStatusChangeReason.id}
                    </Button>
                  </td>
                  <td>{championStatusChangeReason.reason}</td>
                  <td>
                    <Translate contentKey={`championApp.ChampionStatus.${championStatusChangeReason.reasonForChampionStatus}`} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${championStatusChangeReason.id}`}
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
                        to={`${match.url}/${championStatusChangeReason.id}/edit`}
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
                        to={`${match.url}/${championStatusChangeReason.id}/delete`}
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
              <Translate contentKey="championApp.championStatusChangeReason.home.notFound">
                No Champion Status Change Reasons found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ championStatusChangeReason }: IRootState) => ({
  championStatusChangeReasonList: championStatusChangeReason.entities,
  loading: championStatusChangeReason.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionStatusChangeReason);
