import ITypedMap from './ITypedMap';
import {fromJS} from 'immutable';
import {ActionType} from 'typesafe-actions';
import * as RouteActions from '../actions/route';
import {
  IStopApi,
  INodeData,
  IRouteStopApi,
  IRouteApi,
  PlanResult,
  IRoute,
} from '../../models/route';
import {Place} from 'react-native-google-places-autocomplete';

interface IRouteState {
  stopData?: IStopApi;
  routeStopData?: IRouteStopApi;
  routeData?: IRouteApi;
  nodeData?: INodeData;
  error?: Error;
  planResults?: PlanResult[];
  locationHistory?: Place[];
  routeHistory?: IRoute[];
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

    // get node data from server;
    case RouteActions.GET_NODE_DATA_SUCCESS:
      return state.set('nodeData', action.payload.data);
    case RouteActions.GET_NODE_DATA_FAIL:
      return state.set('error', action.payload.error);

    case RouteActions.SAVE_PLAN_RESULT:
      return state.set(`planResults`, action.payload.data);

    case RouteActions.SAVE_LOCATION_HISTORY:
      let locationHistory = state.get(`locationHistory`) ?? [];

      if (locationHistory.length > 0) {
        locationHistory.unshift(action.payload.place);
      } else {
        locationHistory = [action.payload.place];
      }

      const newLocationHistory = locationHistory.filter((value, index) => {
        const _value = JSON.stringify(value);
        return (
          index ===
          locationHistory.findIndex(obj => {
            return JSON.stringify(obj) === _value;
          })
        );
      });
      return state.set('locationHistory', newLocationHistory);

    case RouteActions.SAVE_ROUTE_HISTORY:
      let routeHistory = state.get(`routeHistory`) ?? [];

      if (routeHistory.length > 0) {
        routeHistory.unshift(action.payload.route);
      } else {
        routeHistory = [action.payload.route];
      }

      const newRouteHistory = routeHistory.filter((value, index) => {
        const _value = JSON.stringify(value);
        return (
          index ===
          routeHistory.findIndex(obj => {
            return JSON.stringify(obj) === _value;
          })
        );
      });

      return state.set('routeHistory', newRouteHistory);
    default:
      return state;
  }
};
