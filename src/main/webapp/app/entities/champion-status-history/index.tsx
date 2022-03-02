import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChampionStatusHistory from './champion-status-history';
import ChampionStatusHistoryDetail from './champion-status-history-detail';
import ChampionStatusHistoryUpdate from './champion-status-history-update';
import ChampionStatusHistoryDeleteDialog from './champion-status-history-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChampionStatusHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChampionStatusHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChampionStatusHistoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={ChampionStatusHistory} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ChampionStatusHistoryDeleteDialog} />
  </>
);

export default Routes;
