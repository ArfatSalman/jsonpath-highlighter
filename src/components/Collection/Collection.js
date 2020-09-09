import React from 'react';
import { useSelector } from 'react-redux';
import Entry from '../entries/Entry/Entry';
import styles from './Collection.module.css';

function Collection(props) {
  const { data, style, level = 0, path = '' } = props;

  const entries = Object.entries(data);

  const expandedKeys = useSelector((state) => state.jsonData.expandedKeys);
  const showOnlyMatchedProperties = useSelector(
    (state) => state.settings.showOnlyMatchedProperties
  );

  const mergedStyle = {
    ...style,
    marginLeft: `${level > 0 ? 15 : 10}px`,
  };

  return (
    <div className={styles.collection} style={mergedStyle}>
      {entries.map((entry) => {
        const [key, value] = entry;
        const fullPath = path === '' ? key : `${path}.${key}`;

        if (showOnlyMatchedProperties && !expandedKeys[fullPath]) {
          return null;
        }

        const entryProps = {
          keyName: key,
          value,
          key,
          level,
          path: fullPath,
        };

        return <Entry {...entryProps} />;
      })}
    </div>
  );
}

export default Collection;
