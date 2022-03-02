// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './champion.reducer';
import { IChampion } from 'app/shared/model/champion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChampionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Champion = (props: IChampionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { championList, match, loading } = props;
  return (
    <div>
      <h2 id="champion-heading" data-cy="ChampionHeading">
        <Translate contentKey="championApp.champion.home.title">Champions</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="championApp.champion.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="championApp.champion.home.createLabel">Create new Champion</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {championList && championList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="championApp.champion.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.maxChampionId">Max Champion Id</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.prospectiveId">Prospective Id</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.account">Account</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.middleName">Middle Name</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.city">City</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.emailAddress">Email Address</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.hasInsurance">Has Insurance</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.hasDriverLicense">Has Driver License</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.createdOn">Created On</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.activatedOn">Activated On</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.updatedOn">Updated On</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.welfareAnalyst">Welfare Analyst</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.maritalStatus">Marital Status</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.stateOfOrigin">State Of Origin</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.stateOfBirth">State Of Birth</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.bankName">Bank Name</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.bankAccountNumber">Bank Account Number</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.bankAccountName">Bank Account Name</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.neatOfKinName">Neat Of Kin Name</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.nextOfKinPhone">Next Of Kin Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.dateOfBirth">Date Of Birth</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.bvn">Bvn</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.houseAddress">House Address</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.emergencyContactName">Emergency Contact Name</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.emergencyContactNumber">Emergency Contact Number</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.entryChannel">Entry Channel</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.hmoProvider">Hmo Provider</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.hmoNumber">Hmo Number</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.metaJson">Meta Json</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.dateEngaged">Date Engaged</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.dateDisengaged">Date Disengaged</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.rating">Rating</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.helmetNumber">Helmet Number</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.registrationNumber">Registration Number</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.phoneBrand">Phone Brand</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.phoneImeNumber">Phone Ime Number</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.contractorId">Contractor Id</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.serviceId">Service Id</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.packageId">Package Id</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.deliveryServiceId">Delivery Service Id</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.statusId">Status Id</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.champion.reasonId">Reason Id</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {championList.map((champion, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${champion.id}`} color="link" size="sm">
                      {champion.id}
                    </Button>
                  </td>
                  <td>{champion.maxChampionId}</td>
                  <td>{champion.prospectiveId}</td>
                  <td>{champion.account}</td>
                  <td>{champion.firstName}</td>
                  <td>{champion.lastName}</td>
                  <td>{champion.middleName}</td>
                  <td>{champion.phoneNumber}</td>
                  <td>
                    <Translate contentKey={`championApp.ChampionStatus.${champion.status}`} />
                  </td>
                  <td>{champion.city}</td>
                  <td>{champion.emailAddress}</td>
                  <td>{champion.hasInsurance ? 'true' : 'false'}</td>
                  <td>{champion.hasDriverLicense ? 'true' : 'false'}</td>
                  <td>
                    {champion.createdOn ? <TextFormat type="date" value={champion.createdOn} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {champion.activatedOn ? <TextFormat type="date" value={champion.activatedOn} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {champion.updatedOn ? <TextFormat type="date" value={champion.updatedOn} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{champion.welfareAnalyst}</td>
                  <td>
                    <Translate contentKey={`championApp.MaritalStatus.${champion.maritalStatus}`} />
                  </td>
                  <td>{champion.stateOfOrigin}</td>
                  <td>{champion.stateOfBirth}</td>
                  <td>{champion.bankName}</td>
                  <td>{champion.bankAccountNumber}</td>
                  <td>{champion.bankAccountName}</td>
                  <td>{champion.neatOfKinName}</td>
                  <td>{champion.nextOfKinPhone}</td>
                  <td>
                    {champion.dateOfBirth ? <TextFormat type="date" value={champion.dateOfBirth} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{champion.bvn}</td>
                  <td>{champion.houseAddress}</td>
                  <td>{champion.emergencyContactName}</td>
                  <td>{champion.emergencyContactNumber}</td>
                  <td>{champion.entryChannel}</td>
                  <td>{champion.hmoProvider}</td>
                  <td>{champion.hmoNumber}</td>
                  <td>
                    {champion.metaJson ? (
                      <div>
                        {champion.metaJsonContentType ? (
                          <a onClick={openFile(champion.metaJsonContentType, champion.metaJson)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {champion.metaJsonContentType}, {byteSize(champion.metaJson)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {champion.dateEngaged ? <TextFormat type="date" value={champion.dateEngaged} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {champion.dateDisengaged ? (
                      <TextFormat type="date" value={champion.dateDisengaged} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{champion.rating}</td>
                  <td>{champion.helmetNumber}</td>
                  <td>{champion.registrationNumber}</td>
                  <td>{champion.phoneBrand}</td>
                  <td>{champion.phoneImeNumber}</td>
                  <td>{champion.contractorId}</td>
                  <td>{champion.serviceId}</td>
                  <td>{champion.packageId}</td>
                  <td>{champion.deliveryServiceId}</td>
                  <td>{champion.statusId}</td>
                  <td>{champion.reasonId}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${champion.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${champion.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${champion.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="championApp.champion.home.notFound">No Champions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ champion }: IRootState) => ({
  championList: champion.entities,
  loading: champion.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Champion);
