import React from 'react';
import { render } from 'react-dom';
import MyComponent from '../lib/MyComponent';

const element = document.createElement('div');
document.body.appendChild(element);
render(<MyComponent name="myComponent" />, element);
