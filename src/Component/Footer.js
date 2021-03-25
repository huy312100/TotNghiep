import React, { Component } from 'react';

const footerstyle = {
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  color: 'white',
  textAlign: 'center',
};

class Footer extends Component {
  render() {
    return (
      <div style={footerstyle}>
        <div className="text-center p-3" style={{color:'black'}}>
          Powered by
        <a className="text-white" href="https://moodle.org/"> Moodle</a>
        </div>
      </div>
    );
  }
}

export default Footer;