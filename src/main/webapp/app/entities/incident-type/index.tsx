import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import IncidentType from './incident-type';
import IncidentTypeDetail from './incident-type-detail';
import IncidentTypeUpdate from './incident-type-update';
import IncidentTypeDeleteDialog from './incident-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IncidentTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IncidentTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IncidentTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={IncidentType} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={IncidentTypeDeleteDialog} />
  </>
);

export default Routes;
