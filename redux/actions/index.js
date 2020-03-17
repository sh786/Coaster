import API, {
	graphqlOperation
} from '@aws-amplify/api';
import {
	listBars,
	listUsers,
	getEventsByBarId,
	getTicketOffersByEventId
} from '../../src/graphql/queries';
import {
	createUser,
	createPurchasedTicket,
} from '../../src/graphql/mutations';

/* BAR ACTIONS */
export const fetchBars = () => {
	return (dispatch) => {
		// best practice to dispatch on request but not handling it right now
		dispatch({
			type: 'FETCH_BARS_REQUEST'
		});
 
		return API.graphql(graphqlOperation(listBars))
			.then((bars) => {
				dispatch({
					type: 'FETCH_BARS_SUCCESS',
					payload: bars.data.listBars.items
				});
			}, e => {
				dispatch({
				type: 'FETCH_BARS_FAILURE',
				payload: e
			})});
	}
}

/* USER ACTIONS */
export const fetchUsers = () => {
	return (dispatch) => {
		dispatch({
			type: 'FETCH_USERS_REQUEST'
		});
		return API.graphql(graphqlOperation(listUsers))
			.then((users) => {
				dispatch({
					type: 'FETCH_USERS_SUCCESS',
					payload: users.data.listUsers.items[0] // just grabbing first user for testing purposes. Need to add concept of session and select user based on that
				});
			}, e => dispatch({
				type: 'FETCH_USERS_FAILURE',
				payload: e
		}));
	}
}


// need to tweak when we do auth
export const createNewUser = (
	username,
	email,
	firstName,
	lastName,
	phoneNumber,
	dob,
) => {
	const user = {
		username,
		email,
		firstName,
		lastName,
		phoneNumber,
		dob,
	};
	return (dispatch) => {
		dispatch({
			type: 'CREATE_USER_REQUEST'
		});

		return API.graphql(graphqlOperation(createUser, {
				input: user
			}))
			.then((d) => {
				dispatch({
					type: 'CREATE_USER_SUCCESS',
					payload: d
				});
				dispatch(fetchBars());
			}, () => {
				dispatch({
					type: 'CREATE_USER_FAILURE'
				});
			});
	}
}

/* EVENT ACTIONS */
export const fetchEventsByBarId = (barId) => {
	return (dispatch) => {
		dispatch({
			type: 'FETCH_EVENTS_REQUEST'
		});
		return API.graphql(graphqlOperation(getEventsByBarId, {barId}))
			.then((response) => {
				dispatch({
					type: 'FETCH_EVENTS_SUCCESS',
					payload: {
						barId,
						events: response.data.getEventsByBarId.items,
					}
				});
			}, e => {
				dispatch({
					type: 'FETCH_EVENTS_FAILURE',
					payload: e
				});
		});
	}
}

/* TICKET OFFER ACTIONS */
export const fetchTicketOffersByEventId = (eventId) => {
	return (dispatch) => {
		dispatch({
			type: 'FETCH_TICKET_OFFERS_REQUEST'
		});
		return API.graphql(graphqlOperation(getTicketOffersByEventId, {eventId}))
			.then((response) => {
				dispatch({
					type: 'FETCH_TICKET_OFFERS_SUCCESS',
					payload: {
						eventId,
						ticketOffers: response.data.getTicketOffersByEventId.items,
					} 
				});
			}, e => dispatch({
				type: 'FETCH_TICKET_OFFERS_FAILURE',
				payload: e
			}));
	}
}

export const createNewPurchasedTicket = (ticketOfferId, eventId, userId) => {
	const input = {
		ticketOfferId, eventId, userId
	};
    return (dispatch) => {
        // best practice to dispatch on request but not handling it right now
        dispatch({ type: 'CREATE_PURCHASED_TICKET_REQUEST' });

        return API.graphql(graphqlOperation(createPurchasedTicket, {input}))
            .then((ticket) => {
                // TODO: add to redux if necessary. Might want to do a fetch all purchased tickets for user
                dispatch({ type: 'CREATE_PURCHASED_TICKET_SUCCESS', payload: ticket });
            }, e => {
              dispatch({ type: 'CREATE_PURCHASED_TICKET_FAILURE', payload: e });
            });
        }
}