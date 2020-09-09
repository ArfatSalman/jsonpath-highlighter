import { combineReducers } from 'redux';
import initialState from './initialState';
import jp, { groupPath } from '../../utils/jsonpath';

function toggleKeys(keys, objectPath) {
  return {
    ...keys,
    [objectPath]: !keys[objectPath],
  };
}

function initialExpandKeys(groupedPath) {
  let keys = {};
  function recurse(obj, path) {
    for (const [key, value] of Object.entries(obj)) {
      let newPath = path === '' ? key : `${path}.${key}`;
      keys[newPath] = true;
      if (typeof value === 'object') {
        recurse(value, newPath);
      }
    }
    return keys;
  }

  return recurse(groupedPath, '');
}

function settings(state = initialState.settings, action) {
  switch (action.type) {
    case 'TOGGLE_SHOW_ONLY_MATCHED_PROPERTIES': {
      return {
        ...state,
        showOnlyMatchedProperties: !state.showOnlyMatchedProperties,
      };
    }
    case 'SET_HIGHLIGHT_COLOR': {
      const { highlightColor } = action;
      return {
        ...state,
        highlightColor,
      };
    }
    case 'TOGGLE_EXPAND_ALL': {
      return {
        ...state,
        expandAll: !state.expandAll,
      };
    }
    default:
      return state;
  }
}

function computeDerivedData(data, jsonPath) {
  const matchedNodes = jp.nodes(data, jsonPath);
  const matchedPaths = matchedNodes.map((node) => node.path);
  const groupedPath = groupPath(matchedPaths);
  const expandedKeys = initialExpandKeys(groupedPath);
  return {
    groupedPath,
    matchedNodes,
    expandedKeys,
  };
}

function jsonData(state = {}, action) {
  switch (action.type) {
    case 'SET_JSON_AND_PATH_EXPRESSION': {
      const { data, pathExpression } = action;
      return {
        data,
        highlightedPath: pathExpression,
        ...computeDerivedData(data, pathExpression),
      };
    }
    case 'SET_JSON_DATA': {
      const { data } = action;
      const { highlightedPath } = state;
      return {
        ...state,
        data: action.data,
        ...computeDerivedData(data, highlightedPath),
      };
    }
    case 'SET_JSON_PATH_EXPRESSION': {
      const { pathExpression } = action;
      const { data } = state;
      return {
        ...state,
        highlightedPath: pathExpression,
        ...computeDerivedData(data, pathExpression),
      };
    }
    case 'TOGGLE_EXPANDED_KEYS': {
      const { path } = action;
      const { expandedKeys } = state;
      return {
        ...state,
        expandedKeys: toggleKeys(expandedKeys, path),
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  settings,
  jsonData,
});
