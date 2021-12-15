import {getDistance} from 'geolib';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  getRouteDataFromApi,
  getRouteStopDataFromApi,
  getStopDataFromApi,
} from '../../api/route';
import {humanWalkingSpeed, normalCarSpeed} from '../../constants/route';
import {
  INodeData,
  IRouteApi,
  IRouteStop,
  IRouteStopApi,
  IStop,
  IStopApi,
} from '../../models/route';
import {hideLoading, showLoading} from '../actions/general';
import {
  getRouteDataFail,
  getRouteDataSuccess,
  getRouteStopDataFail,
  getRouteStopDataSuccess,
  getStopDataFail,
  getStopDataSuccess,
  GET_ROUTE_DATA,
  GET_ROUTE_STOP_DATA,
  GET_STOP_DATA,
  updateNodeDataSuccess,
  UPDATE_NODE_DATA,
} from '../actions/route';
import {
  selectNodeData,
  selectRouteStopData,
  selectStopData,
} from '../selectors/route';

function* handleGetStopData(): any {
  try {
    yield put(showLoading());
    const result: IStopApi = yield call(getStopDataFromApi);
    yield put(getStopDataSuccess(result));
  } catch (err: any) {
    yield put(getStopDataFail(err));
  } finally {
    yield put(hideLoading());
  }
}

function* handleGetRouteStopData(): any {
  try {
    yield put(showLoading());
    const result: IRouteStopApi = yield call(getRouteStopDataFromApi);
    yield put(getRouteStopDataSuccess(result));
  } catch (err: any) {
    yield put(getRouteStopDataFail(err));
  } finally {
    yield put(hideLoading());
  }
}

function* handleGetRouteData(): any {
  try {
    yield put(showLoading());
    const result: IRouteApi = yield call(getRouteDataFromApi);
    yield put(getRouteDataSuccess(result));
  } catch (err: any) {
    yield put(getRouteDataFail(err));
  } finally {
    yield put(hideLoading());
  }
}

function* handleUpdateNodeData(): any {
  yield put(showLoading());

  const stopData: IStop[] = yield select(selectStopData);
  const routeStopData: IRouteStop[] = yield select(selectRouteStopData);
  const nodeData: INodeData = yield select(selectNodeData);

  console.log('start to create stop node', new Date().toString());

  stopData.forEach(from => {
    stopData.forEach(to => {
      if (
        nodeData[from.stop] === undefined ||
        nodeData[from.stop][to.stop] === undefined
      ) {
        const distance =
          getDistance(
            {lat: from.lat, lon: from.long},
            {lat: to.lat, lon: to.long},
          ) + 0.01;

        if (distance < 500) {
          // console.log('distance < 500', from.stop, to.stop, distance);

          if (nodeData[from.stop] === undefined) {
            nodeData[from.stop] = {};
          }

          if (nodeData[to.stop] === undefined) {
            nodeData[to.stop] = {};
          }

          nodeData[from.stop][to.stop] =
            (distance / 1000 / humanWalkingSpeed) * 60;
          nodeData[to.stop][from.stop] =
            (distance / 1000 / humanWalkingSpeed) * 60;
        }
      }
    });
  });

  console.log('complete create stop node', new Date().toString());

  console.log('start to create route stop node', new Date().toString());

  routeStopData.forEach(routeStop => {
    const routeStopKey = `${routeStop.route}.${routeStop.service_type}.${routeStop.bound}.${routeStop.seq}`;

    nodeData[routeStopKey] = {};
    nodeData[routeStopKey][routeStop.stop] = 5;
    nodeData[routeStop.stop][routeStopKey] = 0.01;

    routeStopData
      .filter(
        nextStop =>
          nextStop.route === routeStop.route &&
          nextStop.service_type === routeStop.service_type &&
          nextStop.bound === routeStop.bound &&
          nextStop.seq === `${Number(routeStop.seq) + 1}`,
      )
      .forEach(nextRouteStop => {
        const currentStop = stopData.find(item => item.stop === routeStop.stop);
        const nextStop = stopData.find(
          item => item.stop === nextRouteStop.stop,
        );
        if (currentStop !== undefined && nextStop !== undefined) {
          const nextStopKey = `${nextRouteStop.route}.${nextRouteStop.service_type}.${nextRouteStop.bound}.${nextRouteStop.seq}`;
          const distance = getDistance(
            {lat: currentStop.lat, lon: currentStop.long},
            {lat: nextStop.lat, lon: nextStop.long},
          );
          const cost = (distance / 1000 / normalCarSpeed) * 60;

          nodeData[routeStopKey][nextStopKey] = cost;
        }
      });
  });

  console.log('complete create route stop node', new Date().toString());

  yield put(updateNodeDataSuccess(nodeData));
  yield put(hideLoading());
}

export function* watchHandleRoute() {
  yield takeLatest(GET_STOP_DATA, handleGetStopData);
  yield takeLatest(GET_ROUTE_STOP_DATA, handleGetRouteStopData);
  yield takeLatest(GET_ROUTE_DATA, handleGetRouteData);
  yield takeLatest(UPDATE_NODE_DATA, handleUpdateNodeData);
}
