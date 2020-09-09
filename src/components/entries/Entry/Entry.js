import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleExpandKeys as toggleExpandKeysAction } from '../../../data/actions';
import Key from '../Key';
import Value from '../Value';
import Collection from '../../Collection/Collection';
import Checkbox from '../../Checkbox';
import { isFullPath } from '../../../utils/jsonpath';
import styles from './Entry.module.css';

function Separator(props) {
  return <span>:</span>;
}

function Entry(props) {
  const { keyName, value, valueAs, keyAs, level, ...rest } = props;

  const fullPath = props.path;
  const dispatch = useDispatch();

  const highlightColor = useSelector((state) => state.settings.highlightColor);
  const expandAll = useSelector((state) => state.settings.expandAll);
  const groupedPath = useSelector((state) => state.jsonData.groupedPath);
  const expandedKeysStatus = useSelector((state) => Boolean(state.jsonData.expandedKeys[fullPath]));

  const toggleExpandKeys = useCallback(
    () => dispatch(toggleExpandKeysAction(fullPath)),
    [dispatch, fullPath]
  );

  const isPlainObject = typeof value === 'object' && value !== null;
  const isExpanded = expandAll || expandedKeysStatus;
  const isHighlighted = isFullPath(groupedPath, fullPath);

  const KeyComponent = keyAs || Key;
  const ValueComponent = valueAs || Value;

  const style = React.useMemo(
    () => ({
      backgroundColor: isHighlighted ? highlightColor : '',
    }),
    [highlightColor, isHighlighted]
  );

  return (
    <div style={style} className={styles.entry}>
      {isPlainObject ? (
        <>
          <Checkbox
            id={fullPath}
            checked={isExpanded}
            data-testid={fullPath}
            onChange={toggleExpandKeys}
            label={<KeyComponent>{keyName}</KeyComponent>}
          />
          {isExpanded ? (
            <Collection {...rest} level={level + 1} data={value} />
          ) : (
            <span className={styles.collapsedPlaceholder}>
              {Array.isArray(value)
                ? ` [${value.length}]`
                : ` {${Object.keys(value).length}}`}
            </span>
          )}
        </>
      ) : (
        <>
          <KeyComponent>{keyName}</KeyComponent>
          <Separator />
          <ValueComponent>{value}</ValueComponent>
        </>
      )}
    </div>
  );
}

export default React.memo(Entry);
