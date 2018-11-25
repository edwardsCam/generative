import React from 'react'
import {
  bool, func, object, number,
} from 'prop-types'
import {
  percentWithinRange, valueFromPercent, smoothToStep, clamp,
} from 'utils/Math'
import classnames from 'classnames'
import styles from './index.scss'

export default class Slider extends React.Component {
  static propTypes = {
    config: object.isRequired,
    value: number.isRequired,
    onChange: func.isRequired,
    isFocused: bool.isRequired,
    setFocused: func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      inputValue: `${this.props.value}`,
    }
  }

  componentDidUpdate() {
    const inputValue = this.tempInputValue == null ? `${this.props.value}` : this.tempInputValue
    if (inputValue !== this.state.inputValue) {
      this.setState({ inputValue })
    }

    if (this.props.isFocused) {
      document.addEventListener('keypress', this.handleKeypress)
    } else {
      document.removeEventListener('keypress', this.handleKeypress)
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.stopDragging)
  }

  componentWillUnmount() {
    this.stopDragging()
    document.removeEventListener('mouseup', this.stopDragging)
    document.removeEventListener('keypress', this.handleKeypress)
  }

  render() {
    const { config, isFocused } = this.props
    const className = classnames(styles.sliderContainer, {
      [styles.sliderContainerFocus]: isFocused,
    })
    return (
      <div className={className}>
        <div>
          <span>
            {config.title}
:
          </span>
          {this.renderInput()}
        </div>
        <div
          ref="slider"
          className={styles.slider}
          onMouseDown={this.startDragging}
        >
          {this.renderValue()}
        </div>
      </div>
    )
  }

  renderInput() {
    return (
      <input
        value={this.state.inputValue}
        onChange={this.changeInput}
        onFocus={this.onFocus}
      />
    )
  }

  renderValue() {
    const { config, value } = this.props
    const percentage = percentWithinRange(config.min, config.max, value) * 100
    return (
      <div className={styles.sliderValue} style={{ width: `${percentage}%` }}>
        {this.props.value}
      </div>
    )
  }

  changeInput = (e) => {
    const inputValue = e.target.value
    if (inputValue.match(/^\d*\.?\d*$/)) {
      this.tempInputValue = inputValue
      this.setState({ inputValue })
    } else {
      this.tempInputValue = null
    }
    const val = Number(inputValue)
    if (!isNaN(val)) {
      this.handleValueChange(val)
    }
  }

  onFocus = () => this.props.setFocused(this.props.config.prop);

  startDragging = (e) => {
    if (this.dragdragTargetRectging) return
    e.stopPropagation()
    document.addEventListener('mousemove', this.setValue)

    this.dragTargetRect = this.refs.slider.getBoundingClientRect()
    this.setValue(e)
    this.tempInputValue = null
  }

  stopDragging = () => {
    document.removeEventListener('mousemove', this.setValue)
    this.dragTargetRect = null
  }

  setValue = (e) => {
    if (!this.dragTargetRect) return
    const leftBound = this.dragTargetRect.x
    const rightBound = this.dragTargetRect.right
    const percent = percentWithinRange(leftBound, rightBound, e.clientX)

    const { min, max } = this.props.config
    const value = valueFromPercent(min, max, percent)
    this.handleValueChange(value)
  }

  handleValueChange(value) {
    const {
      min, max, step, prop,
    } = this.props.config
    const smoothedValue = smoothToStep(value, step)
    this.props.onChange(
      prop,
      clamp(min, max, smoothedValue),
    )
    this.props.setFocused(prop)
  }

  handleKeypress = (e) => {
    const { key, shiftKey, ctrlKey } = e
    let delta = 0
    if (key === '[' || key === '{') {
      delta = -this.props.config.step
    } else if (key === ']' || key === '}') {
      delta = this.props.config.step
    }
    if (delta) {
      if (shiftKey) {
        delta *= 5
      }
      if (ctrlKey) {
        delta *= 10
      }
      this.handleValueChange(this.props.value + delta)
    }
  }
}
