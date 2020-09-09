import React from 'react';
import cn from 'classnames';
import styles from './Value.module.css';

function makeObject(className = '', value = null) {
  return {
    className,
    value,
  };
}

function Value(props) {
  const { children, className, as, ...rest } = props;
  const Component = as || 'span';
  let newProps;
  const type = typeof children;
  if (children === null) {
    newProps = makeObject(styles.nullStyle, 'null');
  } else if (type === 'string') {
    newProps = makeObject(styles.stringStyle, `"${children}"`);
  } else if (type === 'number') {
    newProps = makeObject(styles.numberStyle, children);
  } else if (type === 'boolean') {
    newProps = makeObject(styles.booleanStyle, children.toString());
  } else {
    newProps = makeObject(styles.objectPlaceholder, '{ }');
  }

  let classNames = cn(styles.value, newProps.className, className);

  return (
    <Component {...rest} className={classNames}>
      {newProps.value}
    </Component>
  );
}

export default Value;
