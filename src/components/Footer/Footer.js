import React from 'react'
import styles from './Footer.module.css';

function Footer(props) {
  const { children } = props;
  return <footer className={styles.footer}>{children}</footer>
}

export default Footer;