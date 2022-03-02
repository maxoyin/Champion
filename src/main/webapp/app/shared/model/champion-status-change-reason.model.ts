import { ChampionStatus } from 'app/shared/model/enumerations/champion-status.model';

export interface IChampionStatusChangeReason {
  id?: number;
  reason?: string;
  reasonForChampionStatus?: ChampionStatus;
}

export const defaultValue: Readonly<IChampionStatusChangeReason> = {};
