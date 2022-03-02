export interface IWebNotificationType {
  id?: number;
  type?: string;
  displayName?: string;
  oneLinerNote?: string;
  detailedNote?: string;
}

export const defaultValue: Readonly<IWebNotificationType> = {};
