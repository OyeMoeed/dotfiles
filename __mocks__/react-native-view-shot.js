import React from 'react';

class ViewShot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }

  capture() {
    return Promise.resolve('./view-shot-file.jpg');
  }
}

export default ViewShot;
