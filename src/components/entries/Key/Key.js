import React from 'react';
import styles from './Key.module.css';

function Key(props) {
  const { children } = props;
  return <span className={styles.key}>{children}</span>;
}

export default Key;
