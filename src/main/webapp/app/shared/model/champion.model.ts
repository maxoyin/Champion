import dayjs from 'dayjs';
import { IChampionStatusHistory } from 'app/shared/model/champion-status-history.model';
import { IChampionGuarantor } from 'app/shared/model/champion-guarantor.model';
import { IIncident } from 'app/shared/model/incident.model';
import { ChampionStatus } from 'app/shared/model/enumerations/champion-status.model';
import { MaritalStatus } from 'app/shared/model/enumerations/marital-status.model';

export interface IChampion {
  id?: number;
  maxChampionId?: string;
  prospectiveId?: string;
  account?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string | null;
  phoneNumber?: string;
  status?: ChampionStatus;
  city?: string;
  emailAddress?: string | null;
  hasInsurance?: boolean;
  hasDriverLicense?: boolean;
  createdOn?: string;
  activatedOn?: string;
  updatedOn?: string;
  welfareAnalyst?: string | null;
  maritalStatus?: MaritalStatus | null;
  stateOfOrigin?: string | null;
  stateOfBirth?: string | null;
  bankName?: string | null;
  bankAccountNumber?: string | null;
  bankAccountName?: string | null;
  neatOfKinName?: string | null;
  nextOfKinPhone?: string | null;
  dateOfBirth?: string | null;
  bvn?: string | null;
  houseAddress?: string | null;
  emergencyContactName?: string | null;
  emergencyContactNumber?: string | null;
  entryChannel?: string | null;
  hmoProvider?: string | null;
  hmoNumber?: string | null;
  metaJsonContentType?: string | null;
  metaJson?: string | null;
  dateEngaged?: string | null;
  dateDisengaged?: string | null;
  rating?: number | null;
  helmetNumber?: string | null;
  registrationNumber?: string | null;
  phoneBrand?: string | null;
  phoneImeNumber?: string | null;
  contractorId?: string | null;
  serviceId?: string | null;
  packageId?: string | null;
  deliveryServiceId?: string | null;
  statusId?: string | null;
  reasonId?: string | null;
  championStatusHistories?: IChampionStatusHistory[] | null;
  championGuarantors?: IChampionGuarantor[] | null;
  incidents?: IIncident[] | null;
}

export const defaultValue: Readonly<IChampion> = {
  hasInsurance: false,
  hasDriverLicense: false,
};
