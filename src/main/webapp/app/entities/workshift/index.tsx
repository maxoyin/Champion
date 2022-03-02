import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Workshift from './workshift';
import WorkshiftDetail from './workshift-detail';
import WorkshiftUpdate from './workshift-update';
import WorkshiftDeleteDialog from './workshift-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WorkshiftUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WorkshiftUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WorkshiftDetail} />
      <ErrorBoundaryRoute path={match.url} component={Workshift} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={WorkshiftDeleteDialog} />
  </>
);

export default Routes;
