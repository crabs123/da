export interface IBaseInterface {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRoute<T> {
  route: {
    params: T;
  };
}

export interface IRenderItemProps<T> {
  item: T;
  index: number;
}

export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export interface IImage {
  data: string;
  filename: string;
  name: string;
  type: string;
  uri: string;
}

export interface INotification {
  title: string;
  titleLocKey?: string;
  titleLocArgs?: string[];
  body: string;
  bodyLocKey?: string;
  bodyLocArgs?: string[];
  android?: {
    sound?: string;
    channelId?: string;
    color?: string;
    smallIcon?: string;
    imageUrl?: string;
  };
}

export interface IRemoteMessage {
  collapseKey?: string;
  messageId?: string;
  messageType?: string;
  from?: string;
  to?: string;
  ttl?: number;
  sentTime?: number;
  data?: { [key: string]: string };
  notification?: INotification;
  contentAvailable?: boolean;
  mutableContent?: boolean;
  category?: string;
  threadId?: string;
}

export interface IResponse<T> {
  data: T;
  code: string;
  message: null | string;
}
