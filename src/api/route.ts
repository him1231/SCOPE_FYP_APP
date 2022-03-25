import {
  API_NODE_DATA_FROM_SERVER,
  API_ROUTE_DATA,
  API_ROUTE_DATA_FROM_SERVER,
  API_ROUTE_STOP_DATA,
  API_ROUTE_STOP_DATA_FROM_SERVER,
  API_STOP_DATA,
  API_STOP_DATA_FROM_SERVER,
} from '../constants/api';
import {
  INodeData,
  IRouteApi,
  IRouteApiFromServer,
  IRouteStopApi,
  IRouteStopApiFromServer,
  IStopApi,
  IStopApiFromServer,
} from '../models/route';

export const getStopDataFromApi = async () => {
  try {
    const response = await fetch(API_STOP_DATA);
    const json = await response.json();
    return json as IStopApi;
  } catch (error) {
    throw error;
  }
};

export const getStopDataFromServer = async () => {
  try {
    const response = await fetch(API_STOP_DATA_FROM_SERVER);
    const json = await response.json();
    return json as IStopApiFromServer;
  } catch (error) {
    throw error;
  }
};

export const getRouteDataFromServer = async () => {
  try {
    const response = await fetch(API_ROUTE_DATA_FROM_SERVER);
    const json = await response.json();
    return json as IRouteApiFromServer;
  } catch (error) {
    throw error;
  }
};

export const getRouteStopDataFromServer = async (route: string) => {
  try {
    const response = await fetch(
      API_ROUTE_STOP_DATA_FROM_SERVER + `?routeId=${route}`,
    );
    const json = await response.json();
    return json as IRouteStopApiFromServer;
  } catch (error) {
    throw error;
  }
};

export const getRouteStopDataFromApi = async () => {
  try {
    const response = await fetch(API_ROUTE_STOP_DATA);
    const json = await response.json();
    return json as IRouteStopApi;
  } catch (error) {
    throw error;
  }
};

export const getRouteDataFromApi = async () => {
  try {
    const response = await fetch(API_ROUTE_DATA);
    const json = await response.json();
    return json as IRouteApi;
  } catch (error) {
    throw error;
  }
};

export const getNodeDataFromServer = async () => {
  try {
    const response = await fetch(API_NODE_DATA_FROM_SERVER);
    const json = await response.json();
    const nodeData: {[key: string]: {[key: string]: string}} = json.data;
    return Object.fromEntries(
      Object.entries(nodeData).map(([key, value]) => [
        key,
        Object.fromEntries(
          Object.entries(value).map(([key, value]) => [key, Number(value)]),
        ),
      ]),
    );
  } catch (error) {
    throw error;
  }
};
