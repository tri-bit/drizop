import React from 'react';
//import logo from './logo.svg';
import './style.scss';


import Container from 'react-bootstrap/container';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';

import Connections from './components/Connections';
import Title from './components/Title';

import Drizop from '@tri-bit/drizop';

function App() {
  return (
    <div className="App">


      <img className="bgElement1" src="/media/images/wave1.svg" />

      <div className="content">

        <div className="introduction">
          <h1>Drizop</h1>
          <div className="mb-2 center">
          <div>Easy to use file drop for <span className="bold">React.</span></div>
          Includes list and image gallery modes, file extension filtering and progress bar.
          </div>
        </div>


      <Connections />

      <div className="content">

      <div style={{margin:20, display:'flex', flexDirection:'row'}}>

        <Container>
        <Row>

          <Col style={{textAlign:'center'}}>
          <h2>Gallery Mode</h2>
          <div className="drizopWrap"><Drizop style={{margin:5}} mode="image" /></div>
          </Col>

          <Col style={{textAlign:'center'}}>
          <h2>List Mode</h2>
          <div className="drizopWrap"><Drizop style={{margin:5}} message="Drop Image(s) Here" /></div>
          </Col>

        </Row>
        </Container>

      </div>

      <Container>
        <Row className="mt-4 ">
          <Col className="centerWrap mb-2" >
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
          <Col className="centerWrap mb-2">
          <h2>File List Mode</h2>
          </Col>

        </Row>
        <div className="miniDivider"/>




      </Container>




      </div>

      <div>
      <div style={{textAlign:'center'}}><h2>Styling</h2></div>

      <Container>

      <Row>


        <Drizop style={{
          border:'3px solid green',
          backgroundColor:'blue',
          fontSize:'22px',
          padding:20,
          color:'white',
          boxShadow: '0px 14px 14px #333299b0',
          marginBottom:40
        }} message="Drop Image(s) Here" mode="image" />


      </Row>


      </Container>


      </div>


      </div>

    </div>
  );
}

export default App;
