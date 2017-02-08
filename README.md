# Entities Reducer

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]


[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]

This package is a high-order reducer that updates state using entities from [normalizr](https://github.com/paularmstrong/normalizr).
By default, it expects the action to have a property of `entities` or to follow the [`flux-standard-action` spec](https://github.com/acdlite/flux-standard-action).
However, it is possible to pass a data resolver ([see Parameters](#parameter-data-resolver)) if your case doesn't match either of those.  

## Why
**Why does this package exist?**

One of the best things to store in redux is data from server requests. Additionally, working with items stored in redux is best done when the data is normalized.
To simplify the storing of the data, this package will handle updating state with fresh normalized data.
 
Entities Reducer is a high-order reducer, which means it will accept more reducers for further customizations.
The custom reducers are passed directly to `combineRecuders` from redux and should be passed into `entities-reducers` with the same format. 

## Installation
```
npm install --save entities-reducer
--- or ---
yarn add entities-reducer
```

Then add to your root reducer:
```javascript
import { combineReducers } from 'redux';
import entitiesReducer from 'entities-reducer';

const rootReducer = combineReducers({
  entities: entitiesReducer({
    /* custom reducers here */
  }),
});

export default rootReducer;
```

## Parameters

```javascript
entitiesReducer(reducers, { dataResolver })
```

### (#parameters-reducers) Reducers
Reducers are passed directly into `combineReducers` from redux, after the entities have been updated in state. It is called with the updated state and immediately returned. 

### (#parameters-data-resolver) dataResolver
The data resolver is a lookup function that is passed the action and returns the entities object to use while updating.
If the data resolver returns a falsy value the `entities-reducer` will skip process and move directly to handling the custom reducers. 
Below is a customer dataResolver example, or you can checkout the [default resolver](src/index.js). 
**Example**
```javascript
const customDataResolver = (action) => {
  if (action.error) {
    return false;
  }
  return action.data.extra.normalized;
}
```


[build]: https://travis-ci.org/kwelch/entities-reducer
[build-badge]: https://img.shields.io/travis/kwelch/entities-reducer.svg?style=flat-square
[coverage-badge]: https://img.shields.io/codecov/c/github/kwelch/entities-reducer.svg?style=flat-square
[coverage]: https://codecov.io/github/kwelch/entities-reducer
[github-watch-badge]: https://img.shields.io/github/watchers/kwelch/entities-reducer.svg?style=social
[github-watch]: https://github.com/kwelch/entities-reducer/watchers
[github-star-badge]: https://img.shields.io/github/stars/kwelch/entities-reducer.svg?style=social
[github-star]: https://github.com/kwelch/entities-reducer/stargazers
[version-badge]: https://img.shields.io/npm/v/entities-reducer.svg?style=flat-square
[package]: https://www.npmjs.com/package/entities-reducer
