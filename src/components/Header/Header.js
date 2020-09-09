import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import cn from 'classnames';
import Neon from '../Neon';
import { JSONIcon } from '../../assets';
import styles from './Header.module.css';

function Header(props) {
  const { className, ...rest } = props;
  const classNames = cn('justify-content-between', className, styles.header);
  return (
    <Navbar
      className={classNames}
      variant={'dark'}
      bg="dark"
      expand="lg"
      {...rest}
    >
      <Navbar.Brand style={{ fontSize: '1.5rem' }} href="#home">
        <JSONIcon width={'42px'} height={'42px'} />{' '}
        <span className="font-weight-bold">JSON</span> Path{' '}
        <Neon>Highlighter</Neon>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse className="justify-content-between" id="navbar-nav">
        <Nav>
          <Nav.Link
            target="_blank"
            href="https://restfulapi.net/json-jsonpath/"
          >
            What is JSONPath?
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            href="https://github.com/ArfatSalman/jsonpath-highlighter"
            target="_blank"
          >
            GitHub
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
