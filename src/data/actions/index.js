export const actionTypes = {
  TOGGLE_EXPANDED_KEYS: 'TOGGLE_EXPANDED_KEYS',
};

export function toggleExpandKeys(path) {
  return {
    type: actionTypes.TOGGLE_EXPANDED_KEYS,
    path,
  };
}

export function toggleShowOnlyMatchedProperties() {
  return {
    type: 'TOGGLE_SHOW_ONLY_MATCHED_PROPERTIES',
  };
}

export function toggleExpandAll() {
  return {
    type: 'TOGGLE_EXPAND_ALL',
  };
}

export function setHighlightColor(highlightColor) {
  return {
    type: 'SET_HIGHLIGHT_COLOR',
    highlightColor,
  };
}

export function setJSONPathExpression(pathExpression) {
  return {
    type: 'SET_JSON_PATH_EXPRESSION',
    pathExpression,
  };
}

export function setJSONAndPathExpression(data, pathExpression) {
  return {
    type: 'SET_JSON_AND_PATH_EXPRESSION',
    data,
    pathExpression,
  };
}

export function setJSONData(data) {
  return {
    type: 'SET_JSON_DATA',
    data
  };
}
