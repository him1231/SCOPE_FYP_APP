import {combineReducers} from 'redux';
import general from './general';
import route from './route';

export default combineReducers({
  general,
  route,
});
