import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import champion, {
  ChampionState
} from 'app/entities/champion/champion.reducer';
// prettier-ignore
import championStatusHistory, {
  ChampionStatusHistoryState
} from 'app/entities/champion-status-history/champion-status-history.reducer';
// prettier-ignore
import championGuarantor, {
  ChampionGuarantorState
} from 'app/entities/champion-guarantor/champion-guarantor.reducer';
// prettier-ignore
import fieldAgent, {
  FieldAgentState
} from 'app/entities/field-agent/field-agent.reducer';
// prettier-ignore
import incident, {
  IncidentState
} from 'app/entities/incident/incident.reducer';
// prettier-ignore
import webNotification, {
  WebNotificationState
} from 'app/entities/web-notification/web-notification.reducer';
// prettier-ignore
import webNotificationType, {
  WebNotificationTypeState
} from 'app/entities/web-notification-type/web-notification-type.reducer';
// prettier-ignore
import championStatusChangeReason, {
  ChampionStatusChangeReasonState
} from 'app/entities/champion-status-change-reason/champion-status-change-reason.reducer';
// prettier-ignore
import incidentType, {
  IncidentTypeState
} from 'app/entities/incident-type/incident-type.reducer';
// prettier-ignore
import workshift, {
  WorkshiftState
} from 'app/entities/workshift/workshift.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly champion: ChampionState;
  readonly championStatusHistory: ChampionStatusHistoryState;
  readonly championGuarantor: ChampionGuarantorState;
  readonly fieldAgent: FieldAgentState;
  readonly incident: IncidentState;
  readonly webNotification: WebNotificationState;
  readonly webNotificationType: WebNotificationTypeState;
  readonly championStatusChangeReason: ChampionStatusChangeReasonState;
  readonly incidentType: IncidentTypeState;
  readonly workshift: WorkshiftState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  champion,
  championStatusHistory,
  championGuarantor,
  fieldAgent,
  incident,
  webNotification,
  webNotificationType,
  championStatusChangeReason,
  incidentType,
  workshift,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
