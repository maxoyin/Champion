import dayjs from 'dayjs';
import { IChampion } from 'app/shared/model/champion.model';
import { GuarantorsStatus } from 'app/shared/model/enumerations/guarantors-status.model';

export interface IChampionGuarantor {
  id?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  status?: GuarantorsStatus;
  occupation?: string | null;
  updatedOn?: string | null;
  champion?: IChampion | null;
}

export const defaultValue: Readonly<IChampionGuarantor> = {};
