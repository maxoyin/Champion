import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import WebNotificationType from './web-notification-type';
import WebNotificationTypeDetail from './web-notification-type-detail';
import WebNotificationTypeUpdate from './web-notification-type-update';
import WebNotificationTypeDeleteDialog from './web-notification-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WebNotificationTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WebNotificationTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WebNotificationTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={WebNotificationType} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={WebNotificationTypeDeleteDialog} />
  </>
);

export default Routes;
