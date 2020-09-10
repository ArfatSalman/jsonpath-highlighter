import React from 'react';
import { useSelector } from 'react-redux';
import Key from '../Key';
import Value from '../Value';
import Checkbox from '../../Checkbox';
import { isFullPath } from '../../../utils/jsonpath';
import classes from './Entry.module.css';

function Separator(props) {
  return <span>:</span>;
}

function Entry(props) {
  const {
    data: { isLeaf, keyName, value, id, nestingLevel },
    isOpen,
    style,
    toggle,
  } = props;

  const fullPath = id;

  const highlightColor = useSelector((state) => state.settings.highlightColor);
  const groupedPath = useSelector((state) => state.jsonData.groupedPath);

  const isHighlighted = isFullPath(groupedPath, fullPath);

  const KeyComponent = Key;
  const ValueComponent = Value;

  const styles = {
    ...style,
    paddingLeft: `${nestingLevel * 15}px`,
    backgroundColor: isHighlighted ? highlightColor : '',
    width: '100%',
  };

  return (
    <div style={styles} className={classes.entry}>
      {!isLeaf ? (
        <>
          <Checkbox
            id={fullPath}
            checked={isOpen}
            data-testid={fullPath}
            onChange={toggle}
            label={<KeyComponent>{keyName}</KeyComponent>}
          />
          {isOpen ? null : (
            <span className={classes.collapsedPlaceholder}>
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

export default Entry;
