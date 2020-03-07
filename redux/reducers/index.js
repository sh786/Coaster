import { combineReducers } from "redux";

const barsReducer = (state = [], { type, payload }) => {
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

const eventReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case "FETCH_EVENTS_SUCCESS":
            // for (const bar of payload) {
            //     state[bar.name] = payload; // change to bar name linked to event
            // }
            state['The Harp'] = payload;
            return state;
        default:
          return state;
      }
}

export default combineReducers({
  bars: barsReducer,
  user: userReducer,
  events: eventReducer,
});
