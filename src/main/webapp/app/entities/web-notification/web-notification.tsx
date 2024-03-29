// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './web-notification.reducer';
import { IWebNotification } from 'app/shared/model/web-notification.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWebNotificationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const WebNotification = (props: IWebNotificationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { webNotificationList, match, loading } = props;
  return (
    <div>
      <h2 id="web-notification-heading" data-cy="WebNotificationHeading">
        <Translate contentKey="championApp.webNotification.home.title">Web Notifications</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="championApp.webNotification.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="championApp.webNotification.home.createLabel">Create new Web Notification</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {webNotificationList && webNotificationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="championApp.webNotification.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.webNotification.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.webNotification.requestPayload">Request Payload</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.webNotification.updatedOn">Updated On</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.webNotification.updatedBy">Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.webNotification.closedOn">Closed On</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.webNotification.closedBy">Closed By</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.webNotification.webNotificationType">Web Notification Type</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.webNotification.champion">Champion</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {webNotificationList.map((webNotification, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${webNotification.id}`} color="link" size="sm">
                      {webNotification.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`championApp.WebNotificationStatus.${webNotification.status}`} />
                  </td>
                  <td>{webNotification.requestPayload}</td>
                  <td>
                    {webNotification.updatedOn ? (
                      <TextFormat type="date" value={webNotification.updatedOn} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{webNotification.updatedBy}</td>
                  <td>
                    {webNotification.closedOn ? (
                      <TextFormat type="date" value={webNotification.closedOn} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{webNotification.closedBy}</td>
                  <td>
                    {webNotification.webNotificationType ? (
                      <Link to={`web-notification-type/${webNotification.webNotificationType.id}`}>
                        {webNotification.webNotificationType.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {webNotification.champion ? (
                      <Link to={`champion/${webNotification.champion.id}`}>{webNotification.champion.maxChampionId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${webNotification.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${webNotification.id}/edit`}
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
                        to={`${match.url}/${webNotification.id}/delete`}
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
              <Translate contentKey="championApp.webNotification.home.notFound">No Web Notifications found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ webNotification }: IRootState) => ({
  webNotificationList: webNotification.entities,
  loading: webNotification.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WebNotification);
