import entitiesReducer from './index';

describe('entitiesReducer', () => {
  const initialState = {
    users: {
      1: {
        id: 1,
        firstName: 'Kyle',
        lastName: 'Welch',
      },
    },
  };

  it('should reduce entities from payload', () => {
    let newState = entitiesReducer({})(initialState, {
      payload: {
        entities: {
          users: {
            1: {
              firstName: "Kyle",
              id: 1,
              lastName: "Welch",
              middleName: "Ryan",
            },
          },
        },
        result: 1,
      },
      type: "ENTITY/ENTITY_NORMALIZE",
    });
    expect(newState).toMatchSnapshot();

    newState = entitiesReducer({})(newState, {
      payload: {
        entities: {
          users: {
            1: {
              firstName: "Kyle",
              id: 1,
              lastName: "Welch",
              middleName: "Ryan",
              role: 1,
            }
          },
          roles: {
            1: {
              type: "Admin",
              id: 1,
            },
          },
        },
        result: 2,
      },
      type: "ENTITY/ENTITY_NORMALIZE",
    });
    expect(newState).toMatchSnapshot();

    newState = entitiesReducer({})(newState, {
      payload: {
        entities: {
          users: {
            1: {
              firstName: "Kyle",
              id: 1,
              lastName: "Welch",
              middleName: "Ryan",
              address: {
                city: "IL",
              }
            },
          },
        },
        result: 1,
      },
      type: "ENTITY/ENTITY_NORMALIZE",
    });
    expect(newState).toMatchSnapshot();

    newState = entitiesReducer({})(newState, {
      payload: {
        entities: {
          users: {
            1: {
              firstName: "Kyle",
              id: 1,
              lastName: "Welch",
              middleName: "Ryan",
              address: {
                city: "TN",
              }
            },
          },
        },
        result: 1,
      },
      type: "ENTITY/ENTITY_NORMALIZE",
    });
    expect(newState).toMatchSnapshot();
  });

  it('should return state when `!action.payload`', () => {
    const newState = entitiesReducer({})(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should return state when `action.payload.error`', () => {
    const newState = entitiesReducer({})(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should allow customer reducers ', () => {
    const customUserReducer = (state = {}, action) => {
      switch(action.type) {
        case "ENTITY/DELETE": {
          const newState = Object.assign({}, state);
          delete newState[action.payload.result];
          return newState;
        }
      }
    };
    let newState = entitiesReducer({ users: customUserReducer, })(newState, {
      payload: {
        entities: {
          users: {
            1: {
              firstName: "Kyle",
              id: 1,
              lastName: "Welch",
              middleName: "Ryan",
              address: {
                city: "TN",
              }
            },
          },
        },
        result: 1,
      },
      type: "ENTITY/DELETE",
    });
    expect(newState).toMatchSnapshot();
  });
});
