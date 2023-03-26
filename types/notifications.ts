export type INotifications = INotification[];

export interface INotification {
  id: number;
  recipient: Recipient;
  actor: Actor;
  target: any;
  verb: string;
  level: string;
  description: any;
  unread: boolean;
  public: boolean;
  deleted: boolean;
  emailed: boolean;
  timestamp: string;
}

export interface Recipient {
  id: number;
}

export interface Actor {
  id: number;
}
