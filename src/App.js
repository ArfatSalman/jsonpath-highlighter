import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FromUrl } from './components/FetchFromUrl';
import JSONPathHighlighter from './components/JSONPath';
import MatchedPaths from './components/MatchedPaths';
import DataFromFile from './components/DataFromFile';
import Header from './components/Header';
import Footer from './components/Footer';
import PathExpressionInput from './components/PathExpressionInput';
import Settings from './components/Settings';
import CopyToClipboard from './components/CopyToClipboard';
import { FolderIcon, SettingsIcon } from './assets';
import './App.css';

function App(props) {
  return (
    <>
      <Header />
      <Container fluid>
        <Row style={{ height: `calc(100vh - 95px)` }}>
          <Col className={'text-light'} style={{ backgroundColor: '#343a40'}} md={2}>
            <div>
              <h5>
                {' '}
                <FolderIcon width={'20px'} height={'20px'} /> Data Source
              </h5>
              <FromUrl />
              <Form>
                <Form.Text as="span">From File</Form.Text>
                <DataFromFile />
              </Form>
              <label>Manual</label>
              <Button block size="sm" variant={'light'}>
                Enter Data
              </Button>
            </div>
            <hr />
            <div>
              <h5>
                <SettingsIcon width={'24px'} height={'24px'} /> Settings
              </h5>
              <Settings />
            </div>
          </Col>

          <Col
            md={6}
            style={{
              height: '100%',
              display: 'flex',
              flexFlow: 'column',
              // background: 'grey',
            }}
          >
            <PathExpressionInput />
            <JSONPathHighlighter />
          </Col>
          <Col
            style={{ height: '100%', display: 'flex', flexFlow: 'column' }}
            md={4}
          >
            <div className="d-flex align-items-center">
              <h5 style={{margin: 0}}>Match Information</h5> <CopyToClipboard />
            </div>
            <MatchedPaths />
          </Col>
        </Row>
      </Container>
      <Footer>
        <a className="text-reset" href="mailto:giney.paradis@gmail.com">
          <span aria-label="contact" role="img">
            ✉️
          </span>
        </a>
      </Footer>
    </>
  );
}

export default App;
