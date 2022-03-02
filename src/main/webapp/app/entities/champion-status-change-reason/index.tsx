import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChampionStatusChangeReason from './champion-status-change-reason';
import ChampionStatusChangeReasonDetail from './champion-status-change-reason-detail';
import ChampionStatusChangeReasonUpdate from './champion-status-change-reason-update';
import ChampionStatusChangeReasonDeleteDialog from './champion-status-change-reason-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChampionStatusChangeReasonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChampionStatusChangeReasonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChampionStatusChangeReasonDetail} />
      <ErrorBoundaryRoute path={match.url} component={ChampionStatusChangeReason} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ChampionStatusChangeReasonDeleteDialog} />
  </>
);

export default Routes;
