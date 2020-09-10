import React from 'react'
import styles from './Footer.module.css';
import cn from 'classnames';

function Footer(props) {
  const { children, className } = props;
  const classNames = cn(styles.footer, className);
  return <footer className={classNames}>{children}</footer>
}

export default Footer;