import {API_ROUTE_STOP_DATA, API_STOP_DATA} from '../constants/api';
import {IStopApi} from '../models/route';

export const getStopDataFromApi = async () => {
  try {
    const response = await fetch(API_STOP_DATA);
    const json = await response.json();
    return json as IStopApi;
  } catch (error) {
    throw error;
  }
};

export const getRouteStopDataFromApi = async () => {
  try {
    const response = await fetch(API_ROUTE_STOP_DATA);
    const json = await response.json();
    return json as IStopApi;
  } catch (error) {
    throw error;
  }
};
