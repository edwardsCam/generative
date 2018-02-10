import React from 'react';
import { string, bool } from 'prop-types';
import classnames from 'classnames';
import styles from './Tray.scss';

export default class Tray extends React.Component {

  static propTypes = {
    side: string.isRequired,
    isOpen: bool.isRequired,
  }

  render() {
    const { side, isOpen, children } = this.props;
    const className = classnames(styles.tray, {
      [styles.left]:  side === 'left',
      [styles.right]: side === 'right',
      [styles.open]:  isOpen,
    })
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}
