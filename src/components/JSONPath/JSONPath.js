import React from 'react';
import { useSelector } from 'react-redux';
import Collection from '../Collection';
import styles from './JSONPath.module.css';

function JSONPath(props) {
  const data = useSelector((state) => state.jsonData.data);

  return (
    <div
      className={styles.jsonPath}
    >
      <Collection data={data} {...props} />
    </div>
  );
}

export default JSONPath;
