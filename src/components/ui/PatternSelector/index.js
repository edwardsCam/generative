import React from 'react';
import { object } from 'prop-types';

export default class PatternSelector extends React.Component {

  static propTypes = {
    pattern: object.isRequired,
  }

  render() {
    return (
      <div className='pattern-selector'>
        {this.props.pattern.name}
      </div>
    );
  }
}
