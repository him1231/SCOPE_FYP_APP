export type IStop = {
  stop: string;
  name_en: string;
  name_tc: string;
  name_sc: string;
  lat: string;
  long: string;
};

export type IStopApi = {
  type: string;
  version: string;
  generated_timestamp: string;
  data: IStop[];
};

export type IStopApiFromServer = {
  status: string;
  data: {
    _id: string;
    stopId: string;
    createdAt: string;
    lat: number;
    locationType: string;
    lon: number;
    name: string;
    timezone: string;
    updatedAt: string;
    zoneId: string;
  }[];
};

export type IRouteApiFromServer = {
  status: string;
  data: {
    _id: string;
    routeId: string;
    agency: string;
    createdAt: string;
    longName: string;
    shortName: string;
    type: string;
    updatedAt: string;
    url: string;
  }[];
};

export type IRouteStop = {
  route: string;
  bound: string;
  service_type: string;
  seq: string;
  stop: string;
};

export type IRouteStopApi = {
  type: string;
  version: string;
  generated_timestamp: string;
  data: IRouteStop[];
};

export type IRoute = {
  route: string;
  bound: string;
  service_type: string;
  name_en?: string;
  name_tc?: string;
  name_sc?: string;
  orig_en: string;
  orig_tc: string;
  orig_sc: string;
  dest_en: string;
  dest_tc: string;
  dest_sc: string;
};

export type IRouteApi = {
  type: string;
  version: string;
  generated_timestamp: string;
  data: IRoute[];
};

export type INodeData = {[key: string]: {[key: string]: number}};

export type PlanResult = {
  cost: number;
  path: string[];
};
