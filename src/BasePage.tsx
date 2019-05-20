import * as React from 'react';
import { Component } from 'react';
import './common.scss';
import { Navbar } from './components/reusableComponents/Navbar/index';

export class BasePage extends Component<{ className?: string }> {
  render() {
    return (
      <div style={{ width: '100%', marginBottom: '50px' }} className={`base-page ${this.props.className}`}>
        <div className="bg-container" ></div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
