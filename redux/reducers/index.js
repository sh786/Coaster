import { combineReducers } from 'redux';

const initialState = {
    bars: []
};

const barsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'FETCH_BARS_SUCCESS':
      return { ...state, bars: payload };
    default:
      return state;
  }
};

export default combineReducers({
    bars: barsReducer,
});