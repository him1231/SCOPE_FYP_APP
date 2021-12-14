import {action} from 'typesafe-actions';
import {INodeData, IRouteStopApi, IStopApi} from '../../models/route';

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

export const UPDATE_NODE_DATA = 'UPDATE_NODE_DATA';
export const UPDATE_NODE_DATA_SUCCESS = 'UPDATE_NODE_DATA_SUCCESS';
export const updateNodeData = () => action(UPDATE_NODE_DATA);
export const updateNodeDataSuccess = (nodeData: INodeData) =>
  action(UPDATE_NODE_DATA_SUCCESS, {nodeData});
