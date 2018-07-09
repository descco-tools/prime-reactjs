import { Map } from 'immutable';
import queryString from 'query-string';
/*
 * This action type will be dispatched when your history
 * receives a location change.
 */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = Map();

/*
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged.
 */
export default (state = initialState, { type, payload } = {}) => {
  if (type === LOCATION_CHANGE) {
    return state.mergeDeep({
      ...payload,
      query: queryString.parse(payload.search),
    });
  }
  return state;
};
