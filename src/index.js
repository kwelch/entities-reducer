const updateEntity = (state, entities) => {
  return Object.assign({}, state, entities);
};

const updateEntities = (state, key, entities) => {
  return Object.assign({}, state, { [key]: updateEntity(state[key], entities[key]) });
};

export default (reducers) => (state = {}, action) => {
  const { payload } = action;
  let newState = state;
  if (payload && !payload.error && payload.entities) {
    const { entities } = payload;
    newState = Object.keys(entities).reduce((acc, key) => updateEntities(acc, key, entities), newState);
  }
  newState = Object.keys(reducers).reduce((acc, key) => {
    const reducerReturn = reducers[key](acc[key], action);
    return Object.assign({}, acc, { [key]: reducerReturn });
  }, newState);
  return newState;
};
