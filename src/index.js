import { isFSA } from 'flux-standard-action';
import { combineReducers } from 'redux';

const updateEntity = (state, entities) => {
  return Object.assign({}, state, entities);
};

const updateEntities = (state, key, entities) => {
  return Object.assign({}, state, {
    [key]: updateEntity(state[key], entities[key]),
  });
};

const defaultDataResolver = action => {
  if (isFSA(action)) {
    const { payload } = action;
    if (payload && !payload.error && payload.entities) {
      return payload.entities;
    }
    return null;
  }
  return action.entities;
};

const noOpReducer = (state = null) => state;

const resolveAction = (reducers = {}, state, action) => {
  const baseReducers = Object.keys(state)
    .filter(key => !Object.keys(reducers).includes(key))
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: noOpReducer,
      };
    }, {});
  return combineReducers(Object.assign({}, baseReducers, reducers))(
    state,
    action
  );
};

export default (
  reducers,
  { dataResolver } = { dataResolver: defaultDataResolver }
) => (state = {}, action) => {
  let newState = state;
  const entities = dataResolver(action);
  if (entities && typeof entities === 'object') {
    newState = Object.keys(entities).reduce(
      (acc, key) => updateEntities(acc, key, entities),
      newState
    );
  }
  return resolveAction(reducers, newState, action);
};
