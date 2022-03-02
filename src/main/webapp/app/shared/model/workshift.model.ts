export interface IWorkshift {
  id?: number;
  code?: string;
  displayName?: string;
  startTime?: string;
  duration?: number;
}

export const defaultValue: Readonly<IWorkshift> = {};
