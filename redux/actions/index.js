import API, {
	graphqlOperation
} from '@aws-amplify/api';
import {
	listBars,
	listUsers,
	listEvents,
	listTicketOffers,
	getEventsByBarId,
} from '../../src/graphql/queries';
import {
	createBar,
	createUser,
	createEvent,
	createTicketOffer,
	updateEvent,
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
				console.log(bars)
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

export const createNewBar = ({
	name,
	address,
	phoneNumber
}) => {
	const bar = {
		name,
		address,
		phoneNumber,
	};
	return (dispatch) => {
		dispatch({
			type: 'CREATE_BAR_REQUEST'
		});

		return API.graphql(graphqlOperation(createBar, {
				input: bar
			}))
			.then((d) => {
				// should probably use the data here to add the bar to state
				// can avoid api call, but let's figure out what our state should look like first
				dispatch({
					type: 'CREATE_BAR_SUCCESS',
					payload: d
				}); // reducer not handling
				dispatch(fetchBars());
			}, () => dispatch({
				type: 'CREATE_BAR_FAILURE'
			}));
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
			.then((data) => {
				dispatch({
					type: 'FETCH_EVENTS_SUCCESS',
					payload: data.data.listEvents.items[0]  //using first event right now
				});
			}, e => {
				dispatch({
					type: 'FETCH_EVENTS_FAILURE',
					payload: e
				});
		});
	}
}

export const createNewEvent = (
	title,
	description,
	startTime,
	endTime,
	rules,
) => {
	const event = {
		title,
		description,
		startTime,
		endTime,
		rules,
		barId: 1234
	};
	return (dispatch) => {
		dispatch({
			type: 'CREATE_EVENT_REQUEST'
		});

		return API.graphql(graphqlOperation(createEvent, {
				input: event
			}))
			.then((d) => {
				dispatch({
					type: 'CREATE_EVENT_SUCCESS',
					payload: d
				});
				dispatch(fetchEvents());
			}, () => {
				dispatch({
					type: 'CREATE_EVENT_FAILURE'
				});
			});
	}
}

export const updateEventWithTicketOffer = ({
	id,
	title,
	description,
	startTime,
	endTime,
	rules,
}, ticketOfferId) => {
	const eventInput = {
		id,
		title,
		description,
		startTime,
		endTime,
		rules,
	}
	return (dispatch) => {
		dispatch({
			type: 'UPDATE_EVENT_REQUEST'
		});

		return API.graphql(graphqlOperation(updateEvent, {
				input: eventInput,
				condition: ticketOfferId
			}))
			.then((d) => {
				console.log(d);
				dispatch({
					type: 'UPDATE_EVENT_SUCCESS',
					payload: d
				});
				dispatch(fetchEvents());
			}, e => {
				console.log(e);
				dispatch({
					type: 'UPDATE_EVENT_FAILURE'
				});
			});
	}
}

/* TICKET OFFER ACTIONS */
export const fetchTicketOffers = () => {
	return (dispatch) => {
		dispatch({
			type: 'FETCH_TICKET_OFFERS_REQUEST'
		});
		return API.graphql(graphqlOperation(listTicketOffers))
			.then((data) => {
				dispatch({
					type: 'FETCH_TICKET_OFFERS_SUCCESS',
					payload: data 
				});
			}, e => dispatch({
				type: 'FETCH_TICKET_OFFERS_FAILURE',
				payload: e
			}));
	}
}

export const createNewTicketOffer = (
	title,
	description,
	capacity,
	expiration,
	price,
) => {
	const ticket = {
		title,
		description,
		capacity,
		expiration,
		price,
	};
	return (dispatch) => {
		dispatch({
			type: 'CREATE_TICKET_OFFER_REQUEST'
		});

		return API.graphql(graphqlOperation(createTicketOffer, {
				input: ticket
			}))
			.then((d) => {
				dispatch({
					type: 'CREATE_TICKET_OFFER_SUCCESS',
					payload: d
				});
				dispatch(fetchTicketOffers());
			}, () => {
				dispatch({
					type: 'CREATE_TICKET_OFFER_FAILURE'
				});
			});
	}
}

// export const createNewPurchasedTicket = () => {
//     return (dispatch) => {
//         // best practice to dispatch on request but not handling it right now
//         dispatch({ type: 'CREATE_PURCHASED_TICKET_REQUEST' });

//         return API.graphql(graphqlOperation(ticketOffering))
//             .then((ticket) => {
//                 console.log(ticket, 'hahah')
//                 dispatch({ type: 'CREATE_PURCHASED_TICKET_SUCCESS', payload: bars.data.listBars.items });
//             }, e => {
//               console.log(e)
//               dispatch({ type: 'CREATE_PURCHASED_TICKET_FAILURE', payload: e });
//             });
//         }
// }