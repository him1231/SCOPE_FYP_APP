import {Place} from 'react-native-google-places-autocomplete';
import {action} from 'typesafe-actions';
import {RouteLocation} from '../../constants/map';
import {
  INodeData,
  IRoute,
  IRouteApi,
  IRouteStopApi,
  IStopApi,
  PlanResult,
} from '../../models/route';

export const GET_STOP_DATA = 'GET_STOP_DATA';
export const GET_STOP_DATA_SUCCESS = 'GET_STOP_DATA_SUCCESS';
export const GET_STOP_DATA_FAIL = 'GET_STOP_DATA_FAIL';

export const getStopData = () => action(GET_STOP_DATA);
export const getStopDataSuccess = (data: IStopApi) =>
  action(GET_STOP_DATA_SUCCESS, {data});
export const getStopDataFail = (error: Error) =>
  action(GET_STOP_DATA_FAIL, {error});

export const GET_ROUTE_STOP_DATA = 'GET_ROUTE_STOP_DATA';
export const GET_ROUTE_STOP_DATA_SUCCESS = 'GET_ROUTE_STOP_DATA_SUCCESS';
export const GET_ROUTE_STOP_DATA_FAIL = 'GET_ROUTE_STOP_DATA_FAIL';

export const getRouteStopData = () => action(GET_ROUTE_STOP_DATA);
export const getRouteStopDataSuccess = (data: IRouteStopApi) =>
  action(GET_ROUTE_STOP_DATA_SUCCESS, {data});
export const getRouteStopDataFail = (error: Error) =>
  action(GET_ROUTE_STOP_DATA_FAIL, {error});

export const GET_ROUTE_DATA = 'GET_ROUTE_DATA';
export const GET_ROUTE_DATA_SUCCESS = 'GET_ROUTE_DATA_SUCCESS';
export const GET_ROUTE_DATA_FAIL = 'GET_ROUTE_DATA_FAIL';

export const getRouteData = () => action(GET_ROUTE_DATA);
export const getRouteDataSuccess = (data: IRouteApi) =>
  action(GET_ROUTE_DATA_SUCCESS, {data});
export const getRouteDataFail = (error: Error) =>
  action(GET_ROUTE_DATA_FAIL, {error});

export const UPDATE_NODE_DATA = 'UPDATE_NODE_DATA';
export const UPDATE_NODE_DATA_SUCCESS = 'UPDATE_NODE_DATA_SUCCESS';
export const updateNodeData = () => action(UPDATE_NODE_DATA);
export const updateNodeDataSuccess = (nodeData: INodeData) =>
  action(UPDATE_NODE_DATA_SUCCESS, {nodeData});

// get node data from server;
export const GET_NODE_DATA = 'GET_NODE_DATA';
export const GET_NODE_DATA_SUCCESS = 'GET_NODE_DATA_SUCCESS';
export const GET_NODE_DATA_FAIL = 'GET_NODE_DATA_FAIL';

export const getNodeData = () => action(GET_NODE_DATA);
export const getNodeDataSuccess = (data: INodeData) =>
  action(GET_NODE_DATA_SUCCESS, {data});
export const getNodeDataFail = (error: Error) =>
  action(GET_NODE_DATA_FAIL, {error});

export const SAVE_PLAN_RESULT = 'SAVE_PLAN_RESULT';
export const savePlanResult = (data: PlanResult[]) =>
  action(SAVE_PLAN_RESULT, {data});

export const SAVE_LOCATION_HISTORY = 'SAVE_LOCATION_HISTORY';
export const saveLocationHistory = (place: Place) =>
  action(SAVE_LOCATION_HISTORY, {place});

export const SAVE_ROUTE_HISTORY = 'SAVE_ROUTE_HISTORY';
export const saveRouteHistory = (route: IRoute) =>
  action(SAVE_ROUTE_HISTORY, {route});

export const ROUTE_PLANNING = 'ROUTE_PLANNING';
export const ROUTE_PLANNING_SUCCESS = 'ROUTE_PLANNING_SUCCESS';
export const ROUTE_PLANNING_FAIL = 'ROUTE_PLANNING_FAIL';

export const asyncRoutePlanning = (
  startLocation: RouteLocation,
  endLocation: RouteLocation,
) => action(ROUTE_PLANNING, {startLocation, endLocation});

export const asyncRoutePlanningSuccess = (result: PlanResult[]) =>
  action(ROUTE_PLANNING_SUCCESS, {result});

export const asyncRoutePlanningFail = (error: Error) =>
  action(ROUTE_PLANNING_FAIL, {error});
