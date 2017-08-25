import { combineReducers } from 'redux';
import * as types from '../actions/actionTypes';

const initialState = {
    testData:'zzf'
};

export default (state=initialState,action) => {
  let [ name, value ] = [ '', ''];
  if(action && action.payload ){
      name = action.payload.name;
      value = action.payload.value;
  }
  switch(action.type){
    case types.COMMON_ACTION:
      const obj = {};
      obj[name] = value;
      return Object.assign({}, state, obj);

    default:return state;
  }
};
