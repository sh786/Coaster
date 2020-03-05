import { combineReducers } from "redux";

const barsReducer = (state = [], { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "FETCH_BARS_SUCCESS":
      return payload;
    default:
      return state;
  }
};

const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "FETCH_USERS_SUCCESS":
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  bars: barsReducer,
  user: userReducer
});
