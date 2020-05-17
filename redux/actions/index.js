import API, { graphqlOperation } from '@aws-amplify/api';
import {
  listBars,
  getEventsByBarId,
  getTicketOffersByEventId,
  getPurchasedTicketsByUser,
  userByUsername,
  listUsers,
  getPurchasedTicket,
  getBar,
  getPurchasedTicketsByEvent,
  getHeadCountByBarId,
  listHeadCounts,
} from '../../src/graphql/queries';
import {
	createUser,
	createPurchasedTicket,
	updatePurchasedTicket,
	updateHeadCount,
} from '../../src/graphql/mutations';
import {onHeadCountChangeByBarId, onUpdateHeadCount} from '../../src/graphql/subscriptions';

import Auth from '@aws-amplify/auth';
//import Analytics from '@aws-amplify/analytics';
import {Analytics} from 'aws-amplify';

/* USER LOCATION */
export const setLocation = (location) => {
  return (dispatch) => {
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
  return (dispatch) => {
    dispatch({ type: 'GET_USER_TOKEN_REQUEST' });

    return Auth.currentAuthenticatedUser()
      .then((user) => {
        const { accessToken } = user.signInUserSession;
        dispatch({
          type: 'GET_USER_TOKEN_SUCCESS',
          payload: accessToken,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'GET_USER_TOKEN_FAILURE',
          payload: err,
        });
      });
  };
};

export const clearUserData = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_USER_DATA' });
  };
};

/* BAR ACTIONS */
export const fetchBars = () => {
  return (dispatch) => {
    // best practice to dispatch on request but not handling it right now
    dispatch({
      type: 'FETCH_BARS_REQUEST',
    });

    return API.graphql(graphqlOperation(listBars)).then(
      (bars) => {
        dispatch({
          type: 'FETCH_BARS_SUCCESS',
          payload: bars.data.listBars.items,
		});
		dispatch(fetchHeadCounts());
      },
      (e) => {
        dispatch({
          type: 'FETCH_BARS_FAILURE',
          payload: e,
        });
      },
    );
  };
};

export const fetchBar = (id) => {
  return (dispatch) => {
    // best practice to dispatch on request but not handling it right now
    dispatch({
      type: 'FETCH_BAR_REQUEST',
    });

    return API.graphql(graphqlOperation(getBar, { id })).then(
      (bar) => {
        dispatch({
          type: 'FETCH_BAR_SUCCESS',
          payload: bar.data.getBar,
        });
      },
      (e) => {
        dispatch({
          type: 'FETCH_BAR_FAILURE',
          payload: e,
        });
      },
    );
  };
};

/* USER ACTIONS */
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_USERS_REQUEST',
    });
    return API.graphql(graphqlOperation(listUsers)).then(
      (users) => {
        dispatch({
          type: 'FETCH_USERS_SUCCESS',
          payload: users.data.listUsers.items[0], // just grabbing first user for testing purposes. Need to add concept of session and select user based on that
        });
      },
      (e) =>
        dispatch({
          type: 'FETCH_USERS_FAILURE',
          payload: e,
        }),
    );
  };
};

export const fetchUserByUsername = (username) => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_USER_REQUEST',
    });
    return API.graphql(graphqlOperation(userByUsername, { username })).then(
      (data) => {
        dispatch({
          type: 'FETCH_USER_SUCCESS',
          payload: data.data.userByUsername.items[0],
        });
      },
      (e) =>
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
  return (dispatch) => {
    dispatch({
      type: 'CREATE_USER_REQUEST',
    });

    return API.graphql(
      graphqlOperation(createUser, {
        input: user,
      }),
    ).then(
      (d) => {
        dispatch({
          type: 'CREATE_USER_SUCCESS',
          payload: d,
        });
        dispatch(fetchBars());
      },
      (e) => {
        dispatch({
          type: 'CREATE_USER_FAILURE',
        });
      },
    );
  };
};

/* EVENT ACTIONS */
export const fetchEventsByBarId = (barId) => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_EVENTS_REQUEST',
    });
    return API.graphql(graphqlOperation(getEventsByBarId, { barId })).then(
      (response) => {
        dispatch({
          type: 'FETCH_EVENTS_SUCCESS',
          payload: {
            barId,
            events: response.data.getEventsByBarId.items,
          },
        });
      },
      (e) => {
        dispatch({
          type: 'FETCH_EVENTS_FAILURE',
          payload: e,
        });
      },
    );
  };
};

/* TICKET OFFER ACTIONS */
export const fetchTicketOffersByEventId = (eventId) => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_TICKET_OFFERS_REQUEST',
    });
    return API.graphql(
      graphqlOperation(getTicketOffersByEventId, { eventId }),
    ).then(
      (response) => {
        dispatch({
          type: 'FETCH_TICKET_OFFERS_SUCCESS',
          payload: {
            eventId,
            ticketOffers: response.data.getTicketOffersByEventId.items,
          },
        });
      },
      (e) =>
        dispatch({
          type: 'FETCH_TICKET_OFFERS_FAILURE',
          payload: e,
        }),
    );
  };
};

/* PURCHASED TICKET ACTIONS */
export const createNewPurchasedTicket = (
  ticketOfferId,
  eventId,
  userId,
  venueId,
) => {
  const input = {
    ticketOfferId,
    eventId,
    userId,
    venueId,
    redeemed: false,
  };
  return (dispatch) => {
    // best practice to dispatch on request but not handling it right now
    dispatch({ type: 'CREATE_PURCHASED_TICKET_REQUEST' });
    return API.graphql(graphqlOperation(createPurchasedTicket, { input })).then(
      (ticket) => {
        // TODO: add to redux if necessary. Might want to do a fetch all purchased tickets for user
        dispatch({ type: 'CREATE_PURCHASED_TICKET_SUCCESS', payload: ticket });
      },
      (e) => {
        dispatch({ type: 'CREATE_PURCHASED_TICKET_FAILURE', payload: e });
      },
    );
  };
};

export const fetchPurchasedTicketsByUserId = (userId) => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_PURCHASED_TICKETS_REQUEST',
    });
    return API.graphql(
      graphqlOperation(getPurchasedTicketsByUser, {
        userId,
        filter: {
          redeemed: {
            eq: false,
          },
        },
      }),
    ).then(
      (response) => {
        dispatch({
          type: 'FETCH_PURCHASED_TICKETS_SUCCESS',
          payload: response.data.getPurchasedTicketsByUser.items,
        });
      },
      (e) => {
        dispatch({
          type: 'FETCH_PURCHASED_TICKETS_FAILURE',
          payload: e,
        });
      },
    );
  };
};

export const fetchRedeemedTicketsByUserId = (userId) => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_REDEEMED_TICKETS_REQUEST',
    });
    return API.graphql(
      graphqlOperation(getPurchasedTicketsByUser, {
        userId,
        filter: {
          redeemed: {
            eq: true,
          },
        },
      }),
    ).then(
      (response) => {
        dispatch({
          type: 'FETCH_REDEEMED_TICKETS_SUCCESS',
          payload: response.data.getPurchasedTicketsByUser.items,
        });
      },
      (e) => {
        dispatch({
          type: 'FETCH_REDEEMED_TICKETS_FAILURE',
          payload: e,
        });
      },
    );
  };
};

/* VENUE PORTAL ACTIONS */
export const fetchPurchasedTicketById = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_PURCHASED_TICKET_REQUEST',
    });
    return API.graphql(graphqlOperation(getPurchasedTicket, { id })).then(
      (response) => {
        dispatch({
          type: 'FETCH_PURCHASED_TICKET_SUCCESS',
          payload: response.data.getPurchasedTicket,
        });
      },
      (e) =>
        dispatch({
          type: 'FETCH_PURCHASED_TICKET_FAILURE',
          payload: e,
        }),
    );
  };
};

export const redeemPurchasedTicket = (ticket) => {
  return (dispatch) => {
    dispatch({
      type: 'REDEEM_TICKET_REQUEST',
    });
    const input = {
      id: ticket.id,
      ticketOfferId: ticket.ticketOfferId,
      eventId: ticket.eventId,
      userId: ticket.userId,
      venueId: ticket.venueId,
      redeemed: true,
    };
    return API.graphql(graphqlOperation(updatePurchasedTicket, { input })).then(
      (response) => {
        dispatch({
          type: 'REDEEM_TICKET_SUCCESS',
          payload: response.data.updatePurchasedTicket,
        });
        dispatch(fetchPurchasedTicketsByEventId(ticket.eventId));
      },
      (e) => {
        dispatch({
          type: 'REDEEM_TICKET_FAILURE',
          payload: e,
        });
      },
    );
  };
};

export const fetchPurchasedTicketsByEventId = (eventId) => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_PURCHASED_TICKETS_FOR_EVENT_REQUEST',
    });
    return API.graphql(
      graphqlOperation(getPurchasedTicketsByEvent, { eventId }),
    ).then(
      (response) => {
        dispatch({
          type: 'FETCH_PURCHASED_TICKETS_FOR_EVENT_SUCCESS',
          payload: {
            tickets: response.data.getPurchasedTicketsByEvent.items,
            eventId,
          },
        });
      },
      (e) => {
        dispatch({
          type: 'FETCH_PURCHASED_TICKETS_FOR_EVENT_FAILURE',
          payload: e,
        });
      },
    );
  };
};

export const clearCurrScannedTicket = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_CURR_SCANNED_TICKET',
    });
  }
}

/* HEAD COUNT ACTIONS */
export const fetchHeadCountByBarId = barId => {
  return dispatch => {
    dispatch({
      type: 'FETCH_HEAD_COUNT_FOR_BAR_REQUEST',
    });
    return API.graphql(graphqlOperation(getHeadCountByBarId, { barId })).then(
      response => {
        dispatch({
          type: 'FETCH_HEAD_COUNT_FOR_BAR_SUCCESS',
          payload: {
            barId,
            headCount: response.data.getHeadCountByBarId.items[0],
          },
        });
      },
      e => {
        dispatch({
          type: 'FETCH_HEAD_COUNT_FOR_BAR_FAILURE',
          payload: e,
        });
      },
    );
  };
};
export const fetchHeadCounts = () => {
	return dispatch => {
		dispatch({
			type: 'FETCH_HEAD_COUNTS_REQUEST',
		});
		return API.graphql(graphqlOperation(listHeadCounts)).then(
			response => {
				dispatch({
					type: 'FETCH_HEAD_COUNTS_SUCCESS',
					payload: response.data.listHeadCounts.items,
				});
			},
			e => {
				dispatch({
					type: 'FETCH_HEAD_COUNTS_FAILURE',
					payload: e,
				});
			},
		);
	};
};

export const subscribeToHeadCountForBar = (barId) => {
	return (dispatch) => {
		return API.graphql(
			graphqlOperation(onHeadCountChangeByBarId, {barId})
		).subscribe({
			next: (response) => {
				dispatch({
					type: 'FETCH_HEAD_COUNT_FOR_BAR_SUCCESS',
					payload: {
						barId,
						headCount: response.value.data.onHeadCountChangeByBarId,
					},
				});
			}
		});
	}
}

export const subscribeToHeadCounts = () => {
	return (dispatch) => {
		return API.graphql(
			graphqlOperation(onUpdateHeadCount)
		).subscribe({
			next: (response) => {
				dispatch({
					type: 'FETCH_HEAD_COUNT_SUCCESS',
					payload: response.value.data.onUpdateHeadCount,
				});
			}
		});
	}
}

export const updateCountForBar = (barId, count, id) => {
	return dispatch => {
		dispatch({
			type: 'UPDATE_COUNT_FOR_BAR',
		});
		const input = {
			barId, 
			count,
			id,
		};
		return API.graphql(graphqlOperation(updateHeadCount, {input}))
			.then((response) => {
        Analytics.record({name: 'update-head-count-3'});
				dispatch({
					type: 'UPDATE_COUNT_FOR_BAR_SUCCESS',
					payload: response.data.updateHeadCount, 
				});
			}, e => {
			dispatch({
				type: 'UPDATE_COUNT_FOR_BAR_FAILURE',
				payload: e
			})
		});
	}
  }
