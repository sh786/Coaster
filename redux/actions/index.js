import API, { graphqlOperation } from '@aws-amplify/api';
import {
	listBars,
	getEventsByBarId,
	getTicketOffersByEventId,
  getPurchasedTicketsByUser,
  userByUsername,
  listUsers,
} from '../../src/graphql/queries';
import { createUser, createPurchasedTicket } from '../../src/graphql/mutations';
import Auth from '@aws-amplify/auth';

/* USER LOCATION */
export const setLocation = location => {
  return dispatch => {
    dispatch({ type: 'SET_LOCATION_REQUEST' });

    // TODO: add failure action
    return dispatch({
      type: 'SET_LOCATION_SUCCESS',
      payload: location,
    });
  };
};

/* USER TOKEN */
export const getUserToken = () => {
  return dispatch => {
    dispatch({ type: 'GET_USER_TOKEN_REQUEST' });

    return Auth.currentAuthenticatedUser()
			.then(user => {
          console.log(user);
          const {accessToken} = user.signInUserSession;
          console.log(accessToken);
          dispatch({
            type: 'GET_USER_TOKEN_SUCCESS',
            payload: accessToken,
          });
				})
			.catch(err => {
        console.log(err)
        dispatch({
          type: 'GET_USER_TOKEN_FAILURE',
          payload: err,
        });
      })
    }
}

export const clearUserData = () => {
  return dispatch => {
    dispatch({ type: 'CLEAR_USER_DATA' });
  }
}

/* BAR ACTIONS */
export const fetchBars = () => {
  console.log('fetch bars');
  return dispatch => {
    // best practice to dispatch on request but not handling it right now
    dispatch({
      type: 'FETCH_BARS_REQUEST',
    });

    return API.graphql(graphqlOperation(listBars)).then(
      bars => {
        dispatch({
          type: 'FETCH_BARS_SUCCESS',
          payload: bars.data.listBars.items,
        });
      },
      e => {
        console.log('err ', e);
        dispatch({
          type: 'FETCH_BARS_FAILURE',
          payload: e,
        });
      },
    );
  };
};

/* USER ACTIONS */
export const fetchUsers = () => {
  return dispatch => {
    dispatch({
      type: 'FETCH_USERS_REQUEST',
    });
    return API.graphql(graphqlOperation(listUsers)).then(
      users => {
        dispatch({
          type: 'FETCH_USERS_SUCCESS',
          payload: users.data.listUsers.items[0], // just grabbing first user for testing purposes. Need to add concept of session and select user based on that
        });
      },
      e =>
        dispatch({
          type: 'FETCH_USERS_FAILURE',
          payload: e,
        }),
    );
  };
};

export const fetchUserByUsername = (username) => {
  return dispatch => {
    dispatch({
      type: 'FETCH_USER_REQUEST',
    });
    return API.graphql(graphqlOperation(userByUsername, {username})).then(
      data => {
        console.log(data, username, 'ahhhhhhhhsldfkj2222');
        dispatch({
          type: 'FETCH_USER_SUCCESS',
          payload: data.data.userByUsername.items[0],
        });
      },
      e =>
        dispatch({
          type: 'FETCH_USER_FAILURE',
          payload: e,
        }),
    );
  };
};

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
  return dispatch => {
    dispatch({
      type: 'CREATE_USER_REQUEST',
    });

    return API.graphql(
      graphqlOperation(createUser, {
        input: user,
      }),
    ).then(
      d => {
        dispatch({
          type: 'CREATE_USER_SUCCESS',
          payload: d,
        });
        dispatch(fetchBars());
      },
      () => {
        dispatch({
          type: 'CREATE_USER_FAILURE',
        });
      },
    );
  };
};

/* EVENT ACTIONS */
export const fetchEventsByBarId = barId => {
  return dispatch => {
    dispatch({
      type: 'FETCH_EVENTS_REQUEST',
    });
    return API.graphql(graphqlOperation(getEventsByBarId, { barId })).then(
      response => {
        dispatch({
          type: 'FETCH_EVENTS_SUCCESS',
          payload: {
            barId,
            events: response.data.getEventsByBarId.items,
          },
        });
      },
      e => {
        dispatch({
          type: 'FETCH_EVENTS_FAILURE',
          payload: e,
        });
      },
    );
  };
};

/* TICKET OFFER ACTIONS */
export const fetchTicketOffersByEventId = eventId => {
  return dispatch => {
    dispatch({
      type: 'FETCH_TICKET_OFFERS_REQUEST',
    });
    return API.graphql(
      graphqlOperation(getTicketOffersByEventId, { eventId }),
    ).then(
      response => {
        dispatch({
          type: 'FETCH_TICKET_OFFERS_SUCCESS',
          payload: {
            eventId,
            ticketOffers: response.data.getTicketOffersByEventId.items,
          },
        });
      },
      e =>
        dispatch({
          type: 'FETCH_TICKET_OFFERS_FAILURE',
          payload: e,
        }),
    );
  };
};


/* PURCHASED TICKET ACTIONS */
export const createNewPurchasedTicket = (ticketOfferId, eventId, userId) => {
  const input = {
    ticketOfferId,
    eventId,
    userId,
  };
  return dispatch => {
    // best practice to dispatch on request but not handling it right now
    dispatch({ type: 'CREATE_PURCHASED_TICKET_REQUEST' });

        return API.graphql(graphqlOperation(createPurchasedTicket, {input}))
            .then((ticket) => {
				console.log(ticket);
                // TODO: add to redux if necessary. Might want to do a fetch all purchased tickets for user
                dispatch({ type: 'CREATE_PURCHASED_TICKET_SUCCESS', payload: ticket });
            }, e => {
				console.log(e);
              	dispatch({ type: 'CREATE_PURCHASED_TICKET_FAILURE', payload: e });
            });
        }
}

export const fetchPurchasedTicketsByUserId = (userId) => {
	return (dispatch) => {
		dispatch({
			type: 'FETCH_PURCHASED_TICKETS_REQUEST'
		});
		return API.graphql(graphqlOperation(getPurchasedTicketsByUser, {userId}))
			.then((response) => {
				dispatch({
					type: 'FETCH_PURCHASED_TICKETS_SUCCESS',
					payload: response.data.getPurchasedTicketsByUser.items, 
				});
			}, e => dispatch({
				type: 'FETCH_PURCHASED_TICKETSS_FAILURE',
				payload: e
			}));
	}
}
