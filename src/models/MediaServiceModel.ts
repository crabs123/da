export enum EWebsocketMediaStatus {
  online = "Online",
  offline = "Offline",
  away = "Away",
  in_call = "In-call",
  reject = "Reject",
  no_answer = "No-Answer",
  calling = "Calling",
  cancel = "Cancel",
}

export enum EWebsocketMediaEvents {
  user_status = "user_status",
  calling_status = "calling_status",
  pending = "pending",
  reject = "reject",
  accept = "accept",
}

export interface IVideoCallDetail {
  callerInfo: {
    callerId: string;
    callerName: string;
    callerSocketId: string;
  };
  receiverInfo: {
    receiverSocketId: string;
    receiverId: string;
    receiverName: string;
  };
  status: EWebsocketMediaStatus;
  roomName: string;
}
