import {createSelector} from 'reselect';
import {RootState} from '../store';

const selectRouteState = (state: RootState) => state.route;

export const selectStopData = createSelector(
  selectRouteState,
  state => state.get('stopData')?.data ?? [],
);

export const selectRouteStopData = createSelector(
  selectRouteState,
  state => state.get('routeStopData')?.data ?? [],
);

export const selectRouteData = createSelector(
  selectRouteState,
  state => state.get('routeData')?.data ?? [],
);

export const selectNodeData = createSelector(
  selectRouteState,
  state => state.get('nodeData') ?? {},
);

export const selectPlanResult = createSelector(
  selectRouteState,
  state => state.get('planResults') ?? [],
);
