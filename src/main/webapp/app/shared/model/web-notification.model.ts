import dayjs from 'dayjs';
import { IWebNotificationType } from 'app/shared/model/web-notification-type.model';
import { IChampion } from 'app/shared/model/champion.model';
import { WebNotificationStatus } from 'app/shared/model/enumerations/web-notification-status.model';

export interface IWebNotification {
  id?: number;
  status?: WebNotificationStatus;
  requestPayload?: string | null;
  updatedOn?: string | null;
  updatedBy?: string | null;
  closedOn?: string | null;
  closedBy?: string | null;
  webNotificationType?: IWebNotificationType | null;
  champion?: IChampion | null;
}

export const defaultValue: Readonly<IWebNotification> = {};
