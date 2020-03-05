import API, { graphqlOperation } from '@aws-amplify/api';
import { listBars } from '../../src/graphql/queries';
import { createBar, createUser } from '../../src/graphql/mutations';

export const fetchBars = () => {
    return (dispatch) => {
        // best practice to dispatch on request but not handling it right now
        dispatch({ type: 'FETCH_BARS_REQUEST' });

        return API.graphql(graphqlOperation(listBars))
            .then((bars) => {
                dispatch({ type: 'FETCH_BARS_SUCCESS', payload: bars.data.listBars.items });
            }, e => dispatch({ type: 'FETCH_BARS_FAILURE', payload: e }));
        }
}

export const createNewBar = ({ name, address, phoneNumber }) => {
  const bar = {
    name,
    address,
    phoneNumber,
  };
  return (dispatch) => {
    dispatch({ type: 'CREATE_BAR_REQUEST' });

    return API.graphql(graphqlOperation(createBar, { input: bar }))
        .then((d) => {
            // should probably use the data here to add the bar to state
            // can avoid api call, but let's figure out what our state should look like first
            console.log(d, 'data from api');
            dispatch({ type: 'CREATE_BAR_SUCCESS', payload: d}); // reducer not handling
            dispatch(fetchBars());
        }, () => dispatch({ type: 'CREATE_BAR_FAILURE' }));
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
  console.log('hello', user);
  return (dispatch) => {
    dispatch({ type: 'CREATE_USER_REQUEST' });

    return API.graphql(graphqlOperation(createUser, { input: user }))
        .then((d) => {
            console.log(d, 'data from api');
            dispatch({ type: 'CREATE_USER_SUCCESS', payload: d});
            dispatch(fetchBars());
        }, () => {
          console.log('failure')
          dispatch({ type: 'CREATE_USER_FAILURE' });
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
