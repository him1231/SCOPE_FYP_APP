import ITypedMap from './ITypedMap';
import {fromJS} from 'immutable';
import {ActionType} from 'typesafe-actions';
import * as GeneralActions from '../actions/general';

interface IGeneralState {
  loadingCount: number;
}

type IGeneralActions = ActionType<typeof GeneralActions>;

const initState: ITypedMap<IGeneralState> = fromJS({
  loadingCount: 0,
});

export default (
  state: ITypedMap<IGeneralState> = initState,
  action: IGeneralActions,
) => {
  switch (action.type) {
    case GeneralActions.SHOW_LOADING:
      return state.set('loadingCount', state.get('loadingCount') + 1);

    case GeneralActions.HIDE_LOADING:
      return state.set(
        'loadingCount',
        state.get('loadingCount') > 0 ? state.get('loadingCount') - 1 : 0,
      );
    default:
      return state;
  }
};
