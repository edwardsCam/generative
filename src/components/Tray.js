import React from 'react';
import { string, bool } from 'prop-types';
import classnames from 'classnames';
import styles from './Tray.css';

export default class Tray extends React.Component {

  static propTypes = {
    side: string.isRequired,
    isOpen: bool.isRequired,
  }

  render() {
    const className = classnames(styles.tray, {
      [styles.left]:  this.props.side === 'left',
      [styles.right]: this.props.side === 'right',
      [styles.open]:  this.props.isOpen,
    })
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}
