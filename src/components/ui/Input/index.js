import React from 'react'
import {
  bool, func, object, string,
} from 'prop-types'
import styles from './index.scss'

export default class Input extends React.Component {
  static propTypes = {
    config: object.isRequired,
    value: string.isRequired,
    onChange: func.isRequired,
    isFocused: bool.isRequired,
    setFocused: func.isRequired,
  }

  render() {
    return (
      <div className={styles.container}>
        <span className={styles.title}>{this.props.config.title}:</span>
        <input
          value={this.props.value}
          onChange={this.handleInputChange}
          onFocus={this.onFocus}
        />
      </div>
    )
  }

  handleInputChange = e => this.props.onChange(this.props.config.prop, e.target.value)

  onFocus = () => this.props.setFocused(this.props.config.prop);
}
