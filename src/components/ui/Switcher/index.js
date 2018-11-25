import React from 'react'
import { object, bool, func } from 'prop-types'
import classnames from 'classnames'
import styles from './index.scss'

export default class Switcher extends React.Component {
  static propTypes = {
    config: object.isRequired,
    value: bool,
    onChange: func.isRequired,
    isFocused: bool.isRequired,
    setFocused: func.isRequired,
  }

  static defaultProps = {
    value: false,
  }

  render() {
    const { value, config, isFocused } = this.props
    const containerClasses = classnames(styles.container, {
      [styles.containerFocus]: isFocused,
    })
    const knobClasses = classnames(styles.knob, {
      [styles.on]: value,
      [styles.off]: !value,
    })
    return (
      <div className={containerClasses}>
        <span>{config.falseVal}</span>
        <button
          className={styles.switcher}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
        >
          <span className={knobClasses} />
        </button>
        <span>{config.trueVal}</span>
      </div>
    )
  }

  handleClick = () => {
    const { value, config, onChange } = this.props
    onChange(config.prop, !value)
  }

  handleFocus = () => {
    const { config, setFocused } = this.props
    setFocused(config.prop)
  }
}
