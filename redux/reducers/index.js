import { combineReducers } from 'redux';

const locationReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_LOCATION_SUCCESS':
      return payload;
    default:
      return state;
  }
};

const barsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_BARS_SUCCESS':
      return payload;
    case 'FETCH_HEAD_COUNT_SUCCESS': {
      const stateCopy = [...state];
      const updatedBar = stateCopy.find(bar => bar.id === payload.barId);
      updatedBar.headCount = payload.count;
      return stateCopy;
    }
    case 'FETCH_HEAD_COUNTS_SUCCESS': {
      const stateCopy = [...state];
      const barIdToHeadCount = payload.reduce((acc, headCountObj) => {
        acc[headCountObj.barId] = headCountObj.count;
        return acc;
      }, []);
      for (const bar of stateCopy) {
        bar.headCount = barIdToHeadCount[bar.id];
      }
      
      return stateCopy;
    }
    default:
      return state;
  }
};

const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'FETCH_USER_SUCCESS':
      return Object.assign({}, state, payload);
    case 'GET_USER_TOKEN_SUCCESS':
      state.token = payload.jwtToken;
      state.username = payload.payload.username;
      return state;
    // on log out
    case 'CLEAR_USER_DATA':
      return {};
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
    case 'FETCH_PURCHASED_TICKETS_SUCCESS':
      return payload;
    default:
      return state;
  }
};

const redeemedTicketsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_REDEEMED_TICKETS_SUCCESS':
      return payload;
    default:
      return state;
  }
};

const venuePortalReducer = (state = {
  currScannedTicket: {}, 
  venue: {},
  successfulRedemption: false,
  headCount: {},
}, { type, payload }) => {
  switch (type) {
    case 'FETCH_PURCHASED_TICKET_SUCCESS': {
      return Object.assign({}, state, { currScannedTicket: payload });
    }
    case 'CLEAR_CURR_SCANNED_TICKET': {
      return Object.assign({}, state, {
        currScannedTicket: {},
        successfulRedemption: false,
      });
    }
    case 'FETCH_BAR_SUCCESS': {
      const venueCopy = { ...payload };
      venueCopy.events = payload.events.items;
      return Object.assign({}, state, { venue: venueCopy });
    }
    case 'FETCH_PURCHASED_TICKETS_FOR_EVENT_SUCCESS': {
      const venueCopy = { ...state.venue };
      const events = venueCopy.events;
      const currEvent = events && events.find((e) => e.id === payload.eventId);
      if (currEvent) {
        currEvent.tickets = payload.tickets;
      }
      return Object.assign({}, state, {
        venue: venueCopy,
      });
    }
    case 'REDEEM_TICKET_SUCCESS': {
      return Object.assign({}, state, {
        successfulRedemption: true,
      });
    }
    case "FETCH_HEAD_COUNT_FOR_BAR_SUCCESS": {
      if (!payload.headCount) {
        return state;
      }
      return Object.assign(
        {},
        state,
        {
          headCount: payload.headCount
        },
      );
    }
    default:
      return state;
  }
};

export default combineReducers({
  location: locationReducer,
  bars: barsReducer,
  user: userReducer,
  events: eventReducer,
  ticketOffers: ticketOffersReducer,
  purchasedTickets: purchasedTicketsReducer,
  redeemedTickets: redeemedTicketsReducer,
  venuePortal: venuePortalReducer,
});
