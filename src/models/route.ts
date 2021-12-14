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

export type INodeData = {[key: string]: {[key: string]: number}};
