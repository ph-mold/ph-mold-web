export interface ITrackerStatus {
  code: string;
  name: string;
}

export interface ITrackerEvent {
  time: string;
  status: ITrackerStatus;
  description: string;
}

export interface ITrackerLastEvent {
  time: string;
  status: ITrackerStatus;
  description: string;
}

export interface ITrackerEvents {
  edges: Array<{
    node: ITrackerEvent;
  }>;
}

export interface ITrackerData {
  lastEvent: ITrackerLastEvent;
  events: ITrackerEvents;
}

export interface ITrackerResponse {
  data: {
    track: ITrackerData;
  };
}

export interface ITrackerVariables {
  carrierId: string;
  trackingNumber: string;
}

export interface ITrackerRequest {
  query: string;
  variables: ITrackerVariables;
}
