import API, { graphqlOperation } from '@aws-amplify/api';
import { listBars } from '../../src/graphql/queries';
import { createBar } from '../../src/graphql/mutations';

export const fetchBars = () => {
    return (dispatch) => {
        // best practice to dispatch on request but not handling it right now
        dispatch({ type: 'FETCH_BARS_REQUEST' });

        return API.graphql(graphqlOperation(listBars))
            .then((bars) => {
                dispatch({ type: 'FETCH_BARS_SUCCESS', payload: bars.data.listBars.items });
            }, () => dispatch({ type: 'FETCH_BARS_FAILURE' }));
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
        }, () => dispatch({ type: 'FETCH_BARS_FAILURE' }));
  }
}
