import React from 'react'
import styles from './Neon.module.css';

export default function(props) {
  const { as, children, ...rest } = props;
  const Component = as || 'span';
  return <Component className={styles.container} {...rest}>{children}</Component>
}