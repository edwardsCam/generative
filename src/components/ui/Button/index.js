import React from 'react'
import { object, func } from 'prop-types'
import styles from './index.scss'

export default class Button extends React.Component {
  static propTypes = {
    config: object.isRequired,
    onClick: func.isRequired,
  };

  render() {
    const { config } = this.props
    return (
      <button className={styles.container} onClick={this.handleClick}>
        {config.title}
      </button>
    )
  }

  handleClick = () => {
    const { config } = this.props
    this.props.onClick(config.callback)
  }
}
