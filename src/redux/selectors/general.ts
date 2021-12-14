import {createSelector} from 'reselect';
import {RootState} from '../store';

const selectGeneralState = (state: RootState) => state.general;

const selectLoadingCount = createSelector(selectGeneralState, state =>
  state.get('loadingCount'),
);

export {selectLoadingCount};
