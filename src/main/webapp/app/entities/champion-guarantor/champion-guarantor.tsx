// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './champion-guarantor.reducer';
import { IChampionGuarantor } from 'app/shared/model/champion-guarantor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChampionGuarantorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ChampionGuarantor = (props: IChampionGuarantorProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { championGuarantorList, match, loading } = props;
  return (
    <div>
      <h2 id="champion-guarantor-heading" data-cy="ChampionGuarantorHeading">
        <Translate contentKey="championApp.championGuarantor.home.title">Champion Guarantors</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="championApp.championGuarantor.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="championApp.championGuarantor.home.createLabel">Create new Champion Guarantor</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {championGuarantorList && championGuarantorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="championApp.championGuarantor.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championGuarantor.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championGuarantor.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championGuarantor.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championGuarantor.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championGuarantor.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championGuarantor.occupation">Occupation</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championGuarantor.updatedOn">Updated On</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.championGuarantor.champion">Champion</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {championGuarantorList.map((championGuarantor, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${championGuarantor.id}`} color="link" size="sm">
                      {championGuarantor.id}
                    </Button>
                  </td>
                  <td>{championGuarantor.firstName}</td>
                  <td>{championGuarantor.lastName}</td>
                  <td>{championGuarantor.phoneNumber}</td>
                  <td>{championGuarantor.address}</td>
                  <td>
                    <Translate contentKey={`championApp.GuarantorsStatus.${championGuarantor.status}`} />
                  </td>
                  <td>{championGuarantor.occupation}</td>
                  <td>
                    {championGuarantor.updatedOn ? (
                      <TextFormat type="date" value={championGuarantor.updatedOn} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {championGuarantor.champion ? (
                      <Link to={`champion/${championGuarantor.champion.id}`}>{championGuarantor.champion.maxChampionId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${championGuarantor.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${championGuarantor.id}/edit`}
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
                        to={`${match.url}/${championGuarantor.id}/delete`}
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
              <Translate contentKey="championApp.championGuarantor.home.notFound">No Champion Guarantors found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ championGuarantor }: IRootState) => ({
  championGuarantorList: championGuarantor.entities,
  loading: championGuarantor.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionGuarantor);
