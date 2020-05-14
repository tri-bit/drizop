import React from 'react';
//import logo from './logo.svg';
import './style.scss';

import Container from 'react-bootstrap/container';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';

import Connections from './components/Connections';


import Drizop from '@tri-bit/drizop';

function App() {
  return (
    <div className="App">

      <h1>Drizop</h1>
      <div>
      Easy to use file drop for React. Includes list and image gallery modes, file extension filtering and progress bar.
      </div>

      <Connections />

      <div className="content">

      <div style={{margin:20, display:'flex', flexDirection:'row'}}>
      <Drizop style={{margin:5}} />
      <Drizop style={{margin:5}} message="Drop Image(s) Here" />
      </div>
        <Container>
          <Row className="mt-4 ">
            <Col className="centerWrap">
            <h2>Gallery Mode</h2>
            </Col>
            <Col>
            <img src="/media/images/drizop_02.png" />
            </Col>
          </Row>
          <div className="miniDivider"/>
          <Row>
            <Col>
            <img src="/media/images/drizop_07.png" />
            </Col>
            <Col className="centerWrap">
            <h2>Gallery Mode</h2>
            </Col>

          </Row>
          <div className="miniDivider"/>
        </Container>

      </div>

    </div>
  );
}

export default App;
