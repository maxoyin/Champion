import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import WebNotification from './web-notification';
import WebNotificationDetail from './web-notification-detail';
import WebNotificationUpdate from './web-notification-update';
import WebNotificationDeleteDialog from './web-notification-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WebNotificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WebNotificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WebNotificationDetail} />
      <ErrorBoundaryRoute path={match.url} component={WebNotification} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={WebNotificationDeleteDialog} />
  </>
);

export default Routes;
