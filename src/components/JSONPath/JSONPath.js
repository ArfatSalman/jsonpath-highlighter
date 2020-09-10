import React, { useCallback, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeTree as Tree } from 'react-vtree';
import AutoSizer from 'react-virtualized-auto-sizer';
import Entry from '../entries/Entry';
import { isPrefixPath } from '../../utils/jsonpath';
import classes from './JSONPath.module.css';

function JSONPath(props) {
  const data = useSelector((state) => state.jsonData.data);
  const groupedPath = useSelector((state) => state.jsonData.groupedPath);
  const expandAll = useSelector((state) => state.settings.expandAll);
  const showOnlyMatchedProperties = useSelector(
    (state) => state.settings.showOnlyMatchedProperties
  );
  const treeRef = useRef();

  useEffect(() => {
    const fn = async () => {
      if (treeRef.current) {
        await treeRef.current.recomputeTree({
          refreshNodes: true,
          useDefaultOpenness: true,
        });
      }
    };
    fn();
  }, [data, groupedPath, expandAll]);

  const objectTreeWalker = useCallback(
    function* objectTreeWalker(refresh) {
      function* dfs(obj, nestingLevel, id) {
        for (const [key, value] of Object.entries(obj)) {
          const isNode = typeof value === 'object' && value !== null;
          const fullPath = id === '' ? key : `${id}.${key}`;

          if (
            showOnlyMatchedProperties &&
            !isPrefixPath(groupedPath, fullPath)
          ) {
            if (isNode) {
              yield* dfs(value, nestingLevel + 1, fullPath);
            }
          } else {
            const isOpened = yield refresh
              ? {
                  isLeaf: !isNode,
                  isOpenByDefault:
                    expandAll || isPrefixPath(groupedPath, fullPath),
                  keyName: key,
                  value,
                  nestingLevel,
                  id: fullPath,
                }
              : fullPath;
            if (isNode && isOpened) {
              yield* dfs(value, nestingLevel + 1, fullPath);
            }
          }
        }
      }
      yield* dfs(data, 0, '');
    },
    [data, expandAll, groupedPath, showOnlyMatchedProperties]
  );

  return (
    <div className={classes.jsonPath}>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <Tree
              ref={treeRef}
              treeWalker={objectTreeWalker}
              itemSize={25}
              height={height}
              width={width}
            >
              {Entry}
            </Tree>
          );
        }}
      </AutoSizer>
    </div>
  );
}

export default JSONPath;
