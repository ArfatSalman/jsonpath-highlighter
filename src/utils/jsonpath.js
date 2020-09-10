import jp from 'jsonpath';

export function isValidJSONPathExpression(path) {
  try {
    jp.parse(path)
    jp.paths({}, path);
    return true;
  } catch {
    return false;
  }
  // do no use just jp.parse: https://github.com/dchester/jsonpath/issues/133
}

export function groupPath(paths) {
  const result = {};
  for (const [, ...path] of paths) {
    let node = result;
    for (const unit of path) {
      if (!node[unit]) {
        node[unit] = {};
      }
      node = node[unit];
    }
  }
  return result;
}

export function isPrefixPath(groupedPath, partialPath) {
  const explodedPath = partialPath.split('.');
  let ob = groupedPath;
  for (const unit of explodedPath) {
    if (ob[unit] === undefined) {
      return false;
    }
    ob = ob[unit];
  }
  return true;
}

export function isFullPath(groupedPath, partialPath) {
  const path = partialPath.split('.');
  let ob = groupedPath;
  let i = 0;
  for (; i < path.length; i++) {
    const p = path[i];
    if (ob[p] === undefined) {
      return false;
    }
    ob = ob[p];
  }
  return Object.keys(ob).length === 0;
}

export { default } from 'jsonpath';