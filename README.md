# Entities reducer

Redux high order reducer for normalized `flux-standard-action`s  

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]


[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]


Allows for updates to entities in state. Accepts custom reducers to further control.

## Usage

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
