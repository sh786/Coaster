import API, { graphqlOperation } from '@aws-amplify/api';
import { listBars } from '../../src/graphql/queries';

export const fetchBars = () => {
    return (dispatch) => {
        API.graphql(graphqlOperation(listBars))
            .then((bars) => {
                console.log(bars, 'action');
                return dispatch({ type: 'FETCH_BARS_SUCCESS', payload: bars.data.listBars.items });
            });
        }
}
