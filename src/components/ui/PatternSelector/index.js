import React from 'react';
import { object, func } from 'prop-types';
import styles from './index.css';

export default class PatternSelector extends React.Component {

  static propTypes = {
    pattern: object.isRequired,
    onSelectPattern: func.isRequired,
  }

  render() {
    const { pattern } = this.props;
    return (
      <div
        className={styles.patternSelector}
        onClick={() => this.props.onSelectPattern(pattern)}
      >
        {pattern.name}
      </div>
    );
  }
}
