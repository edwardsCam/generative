import React from 'react';
import { bool, func } from 'prop-types';
import Tray from './Tray.js';

export default class PatternTray extends React.Component {

  static propTypes = {
    isOpen: bool.isRequired,
    onClickExpander: func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tray side='left' isOpen={this.props.isOpen} >
        <div className='hover-icon' onClick={this.props.onClickExpander}>
          {/* this.props.isOpen ? '<' : '>' */}
        </div>
        <div>
          {/*  TODO  */}
        </div>
      </Tray>
    );
  }
}
