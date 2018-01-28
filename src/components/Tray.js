import React from 'react';
import { string, bool } from 'prop-types';
import classnames from 'classnames';

export default class Tray extends React.Component {

  static propTypes = {
    side: string.isRequired,
    isOpen: bool.isRequired,
  }

  render() {
    const className = classnames('tray', {
      'tray-left': this.props.side === 'left',
      'tray-right': this.props.side === 'right',
      'open': this.props.isOpen,
    })
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}
