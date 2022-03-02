import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Champion from './champion';
import ChampionStatusHistory from './champion-status-history';
import ChampionGuarantor from './champion-guarantor';
import FieldAgent from './field-agent';
import Incident from './incident';
import WebNotification from './web-notification';
import WebNotificationType from './web-notification-type';
import ChampionStatusChangeReason from './champion-status-change-reason';
import IncidentType from './incident-type';
import Workshift from './workshift';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}champion`} component={Champion} />
      <ErrorBoundaryRoute path={`${match.url}champion-status-history`} component={ChampionStatusHistory} />
      <ErrorBoundaryRoute path={`${match.url}champion-guarantor`} component={ChampionGuarantor} />
      <ErrorBoundaryRoute path={`${match.url}field-agent`} component={FieldAgent} />
      <ErrorBoundaryRoute path={`${match.url}incident`} component={Incident} />
      <ErrorBoundaryRoute path={`${match.url}web-notification`} component={WebNotification} />
      <ErrorBoundaryRoute path={`${match.url}web-notification-type`} component={WebNotificationType} />
      <ErrorBoundaryRoute path={`${match.url}champion-status-change-reason`} component={ChampionStatusChangeReason} />
      <ErrorBoundaryRoute path={`${match.url}incident-type`} component={IncidentType} />
      <ErrorBoundaryRoute path={`${match.url}workshift`} component={Workshift} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
