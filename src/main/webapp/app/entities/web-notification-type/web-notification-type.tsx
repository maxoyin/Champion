// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './web-notification-type.reducer';
import { IWebNotificationType } from 'app/shared/model/web-notification-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWebNotificationTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const WebNotificationType = (props: IWebNotificationTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { webNotificationTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="web-notification-type-heading" data-cy="WebNotificationTypeHeading">
        <Translate contentKey="championApp.webNotificationType.home.title">Web Notification Types</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="championApp.webNotificationType.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="championApp.webNotificationType.home.createLabel">Create new Web Notification Type</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {webNotificationTypeList && webNotificationTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="championApp.webNotificationType.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.webNotificationType.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.webNotificationType.displayName">Display Name</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.webNotificationType.oneLinerNote">One Liner Note</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.webNotificationType.detailedNote">Detailed Note</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {webNotificationTypeList.map((webNotificationType, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${webNotificationType.id}`} color="link" size="sm">
                      {webNotificationType.id}
                    </Button>
                  </td>
                  <td>{webNotificationType.type}</td>
                  <td>{webNotificationType.displayName}</td>
                  <td>{webNotificationType.oneLinerNote}</td>
                  <td>{webNotificationType.detailedNote}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${webNotificationType.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${webNotificationType.id}/edit`}
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
                        to={`${match.url}/${webNotificationType.id}/delete`}
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
              <Translate contentKey="championApp.webNotificationType.home.notFound">No Web Notification Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ webNotificationType }: IRootState) => ({
  webNotificationTypeList: webNotificationType.entities,
  loading: webNotificationType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WebNotificationType);
