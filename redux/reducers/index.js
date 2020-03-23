import { combineReducers } from 'redux';

const locationReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_LOCATION_SUCCESS':
      console.log('set location success', payload);
      return payload;
    default:
      return state;
  }
};

const barsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_BARS_SUCCESS':
      return payload;
    default:
      return state;
  }
};

const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'FETCH_USERS_SUCCESS':
      return payload;
    default:
      return state;
  }
};

const eventReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'FETCH_EVENTS_SUCCESS':
      state[payload.barId] = payload.events;
      return state;
    default:
      return state;
  }
};

const ticketOffersReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'FETCH_TICKET_OFFERS_SUCCESS':
      state[payload.eventId] = payload.ticketOffers;
      return state;
    default:
      return state;
  }
};

const purchasedTicketsReducer = (state = [], { type, payload }) => {
  switch (type) {
      case "FETCH_PURCHASED_TICKETS_SUCCESS":
          return payload;
      default:
        return state;
    }
}

export default combineReducers({
  location: locationReducer,
  bars: barsReducer,
  user: userReducer,
  events: eventReducer,
  ticketOffers: ticketOffersReducer,
  purchasedTickets: purchasedTicketsReducer,
});
