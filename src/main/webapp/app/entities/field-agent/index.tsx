import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FieldAgent from './field-agent';
import FieldAgentDetail from './field-agent-detail';
import FieldAgentUpdate from './field-agent-update';
import FieldAgentDeleteDialog from './field-agent-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FieldAgentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FieldAgentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FieldAgentDetail} />
      <ErrorBoundaryRoute path={match.url} component={FieldAgent} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FieldAgentDeleteDialog} />
  </>
);

export default Routes;
