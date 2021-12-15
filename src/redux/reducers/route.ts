import ITypedMap from './ITypedMap';
import {fromJS} from 'immutable';
import {ActionType} from 'typesafe-actions';
import * as RouteActions from '../actions/route';
import {
  IStopApi,
  INodeData,
  IRouteStopApi,
  IRouteApi,
} from '../../models/route';

interface IRouteState {
  stopData?: IStopApi;
  routeStopData?: IRouteStopApi;
  routeData?: IRouteApi;
  nodeData?: INodeData;
  error?: Error;
}

type IRouteActions = ActionType<typeof RouteActions>;

const initState: ITypedMap<IRouteState> = fromJS({});

export default (
  state: ITypedMap<IRouteState> = initState,
  action: IRouteActions,
) => {
  switch (action.type) {
    case RouteActions.GET_STOP_DATA_SUCCESS:
      return state.set('stopData', action.payload.data);
    case RouteActions.GET_STOP_DATA_FAIL:
      return state.set('error', action.payload.error);

    case RouteActions.GET_ROUTE_STOP_DATA_SUCCESS:
      return state.set('routeStopData', action.payload.data);
    case RouteActions.GET_ROUTE_STOP_DATA_FAIL:
      return state.set('error', action.payload.error);

    case RouteActions.GET_ROUTE_DATA_SUCCESS:
      return state.set('routeData', action.payload.data);
    case RouteActions.GET_ROUTE_DATA_FAIL:
      return state.set('error', action.payload.error);

    case RouteActions.UPDATE_NODE_DATA_SUCCESS:
      return state.set('nodeData', action.payload.nodeData);

    default:
      return state;
  }
};
