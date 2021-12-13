import {createSelector} from 'reselect';
import {RootState} from '../store';

const selectNonPersistState = (state: RootState) => state.general;

const selectLoadingCount = createSelector(selectNonPersistState, state =>
  state.get('loadingCount'),
);

export {selectLoadingCount};
