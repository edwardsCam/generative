import React from 'react'
import { func } from 'prop-types'
import FocusTrap from 'focus-trap-react'
import helpText from 'constants/helpText'
import styles from './index.scss'

export default class Modal extends React.Component {
  static propTypes = {
    onClose: func.isRequired,
  }

  render() {
    return (
      <FocusTrap className={styles.backdrop}>
        <div className={styles.container}>
          <button
            className={styles.closeButton}
            onClick={this.props.onClose}
          >
            x
          </button>
          <pre>{helpText}</pre>
        </div>
      </FocusTrap>
    )
  }
}
