import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChampionGuarantor from './champion-guarantor';
import ChampionGuarantorDetail from './champion-guarantor-detail';
import ChampionGuarantorUpdate from './champion-guarantor-update';
import ChampionGuarantorDeleteDialog from './champion-guarantor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChampionGuarantorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChampionGuarantorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChampionGuarantorDetail} />
      <ErrorBoundaryRoute path={match.url} component={ChampionGuarantor} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ChampionGuarantorDeleteDialog} />
  </>
);

export default Routes;
