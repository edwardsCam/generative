import React from 'react'
import { object, func } from 'prop-types'
import styles from './index.scss'

export default class PatternSelector extends React.Component {
  static propTypes = {
    pattern: object.isRequired,
    onSelectPattern: func.isRequired,
  }

  render() {
    const { pattern } = this.props
    return (
      <button
        className={styles.patternSelector}
        onClick={() => this.props.onSelectPattern(pattern)}
      >
        {pattern.name}
      </button>
    )
  }
}
