import {getDistance} from 'geolib';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  getNodeDataFromServer,
  getRouteDataFromApi,
  getRouteDataFromServer,
  getRouteStopDataFromApi,
  getStopDataFromApi,
  getStopDataFromServer,
} from '../../api/route';
import {humanWalkingSpeed, normalCarSpeed} from '../../constants/route';
import {
  INodeData,
  IRouteApi,
  IRouteApiFromServer,
  IRouteStop,
  IRouteStopApi,
  IStop,
  IStopApi,
  IStopApiFromServer,
} from '../../models/route';
import {hideLoading, showLoading} from '../actions/general';
import {
  getNodeDataFail,
  getNodeDataSuccess,
  getRouteDataFail,
  getRouteDataSuccess,
  getRouteStopDataFail,
  getRouteStopDataSuccess,
  getStopDataFail,
  getStopDataSuccess,
  GET_NODE_DATA,
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

function* handleGetStopDataFromServer(): any {
  try {
    yield put(showLoading());
    const result: IStopApiFromServer = yield call(getStopDataFromServer);

    const data: IStopApi = {
      type: '',
      version: '',
      generated_timestamp: '',
      data: result.data.map(item => ({
        stop: item.stopId,
        lat: item.lat.toString(),
        long: item.lon.toString(),
        name_en: '',
        name_tc: '',
        name_sc: '',
      })),
    };

    yield put(getStopDataSuccess(data));
  } catch (err: any) {
    yield put(getStopDataFail(err));
  } finally {
    yield put(hideLoading());
  }
}

function* handleGetRouteDataFromServer(): any {
  try {
    yield put(showLoading());
    const result: IRouteApiFromServer = yield call(getRouteDataFromServer);

    const data: IRouteApi = {
      type: '',
      version: '',
      generated_timestamp: '',
      data: result.data.map(item => ({
        route: item.routeId,
        bound: '',
        service_type: '',
        name_en: item.shortName,
        name_tc: item.shortName,
        name_sc: item.shortName,
        orig_en: item.longName.split(' - ')[0],
        orig_tc: item.longName.split(' - ')[0],
        orig_sc: item.longName.split(' - ')[0],
        dest_en: item.longName.split(' - ')[1],
        dest_tc: item.longName.split(' - ')[1],
        dest_sc: item.longName.split(' - ')[1],
      })),
    };

    yield put(getRouteDataSuccess(data));
  } catch (err: any) {
    yield put(getRouteDataFail(err));
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

function* handleGetNodeData(): any {
  try {
    yield put(showLoading());
    const result: INodeData = yield call(getNodeDataFromServer);
    yield put(getNodeDataSuccess(result));
  } catch (err: any) {
    yield put(getNodeDataFail(err));
  } finally {
    yield put(hideLoading());
  }
}

export function* watchHandleRoute() {
  yield takeLatest(GET_STOP_DATA, handleGetStopDataFromServer);
  yield takeLatest(GET_ROUTE_STOP_DATA, handleGetRouteStopData);
  yield takeLatest(GET_ROUTE_DATA, handleGetRouteDataFromServer);
  yield takeLatest(UPDATE_NODE_DATA, handleUpdateNodeData);
  yield takeLatest(GET_NODE_DATA, handleGetNodeData);
}
