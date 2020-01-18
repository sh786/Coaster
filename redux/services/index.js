import API, { graphqlOperation } from '@aws-amplify/api';
import { listBars } from '../../src/graphql/queries';

async function getBarsFromAPI() {
    const bars = await API.graphql(graphqlOperation(listBars));
    return bars;
}

export default getBarsFromAPI;