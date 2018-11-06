import React, { Component } from 'react';
import classes from './TestComponent.css';

class TestComponent extends React.Component {
  render() {
    return (
      <div className={classes.example}>
        <a>123123</a>
        this is test
      </div>
    );
  }
}

export default TestComponent;
