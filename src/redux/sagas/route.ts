import {getDistance} from 'geolib';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getRouteStopDataFromApi, getStopDataFromApi} from '../../api/route';
import {INodeData, IRouteStopApi, IStop, IStopApi} from '../../models/route';
import {hideLoading, showLoading} from '../actions/general';
import {
  getRouteStopDataFail,
  getRouteStopDataSuccess,
  getStopDataFail,
  getStopDataSuccess,
  GET_ROUTE_STOP_DATA,
  GET_STOP_DATA,
  updateNodeDataSuccess,
  UPDATE_NODE_DATA,
} from '../actions/route';
import {selectNodeData, selectStopData} from '../selectors/route';

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

function* handleUpdateNodeData(): any {
  yield put(showLoading());

  const stopData: IStop[] = yield select(selectStopData);
  const nodeData: INodeData = yield select(selectNodeData);

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
          ) + 1;

        if (distance < 500) {
          console.log('distance < 500', from.stop, to.stop, distance);

          if (nodeData[from.stop] === undefined) {
            nodeData[from.stop] = {};
          }

          if (nodeData[to.stop] === undefined) {
            nodeData[to.stop] = {};
          }

          nodeData[from.stop][to.stop] = distance;
          nodeData[to.stop][from.stop] = distance;
        }
      }
    });
  });

  yield put(updateNodeDataSuccess(nodeData));
  yield put(hideLoading());
}

export function* watchHandleRoute() {
  yield takeLatest(GET_STOP_DATA, handleGetStopData);
  yield takeLatest(GET_ROUTE_STOP_DATA, handleGetRouteStopData);
  yield takeLatest(UPDATE_NODE_DATA, handleUpdateNodeData);
}
