import React from 'react';
import { bool, func, object, number } from 'prop-types';
import { percentWithinRange, valueFromPercent, smoothToStep, clamp } from 'utils/Math';
import classnames from 'classnames';

export default class Slider extends React.Component {

  static propTypes = {
    config: object.isRequired,
    value: number.isRequired,
    onChange: func.isRequired,
    isFocused: bool.isRequired,
    setFocused: func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      inputValue: `${this.props.value}`,
    };
    this.startDragging = this.startDragging.bind(this);
    this.stopDragging = this.stopDragging.bind(this);
    this.setValue = this.setValue.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const inputValue = this.tempInputValue == null ? `${nextProps.value}` : this.tempInputValue;
    this.setState({ inputValue });
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.stopDragging);
  }

  componentWillUnmount() {
    this.stopDragging();
    document.removeEventListener('mouseup', this.stopDragging);
  }

  render() {
    const className = classnames('slider-container', {
      'slider-container--focus': this.props.isFocused,
    });
    return (
      <div className={className}>
        <div>
          <span>{this.props.config.title}:</span>
          {this.renderInput()}
        </div>
        <div
          ref='slider'
          className='slider'
          onMouseDown={this.startDragging}
        >
          {this.renderValue()}
        </div>
      </div>
    );
  }

  renderInput() {
    return (
      <input
        value={this.state.inputValue}
        onChange={this.changeInput}
        onFocus={this.onFocus}
      />
    );
  }

  renderValue() {
    return (
      <div className='slider-value' style={{ width: `${this.percentage()}%` }}>
        {this.props.value}
      </div>
    );
  }

  changeInput(e) {
    const inputValue = e.target.value;
    if (inputValue.match(/^\d*\.?\d*$/)) {
      this.tempInputValue = inputValue;
      this.setState({ inputValue });
    } else {
      this.tempInputValue = null;
    }
    const val = Number(inputValue);
    if (!isNaN(val)) {
      this.saveValue(val);
    }
  }

  onFocus() {
    this.props.setFocused(this.props.config.prop);
  }

  startDragging(e) {
    if (this.dragdragTargetRectging) return;
    e.stopPropagation();
    document.addEventListener('mousemove', this.setValue);

    this.dragTargetRect = this.refs.slider.getBoundingClientRect();
    this.setValue(e);
    this.tempInputValue = null;
  }

  stopDragging() {
    document.removeEventListener('mousemove', this.setValue);
    this.dragTargetRect = null;
  }

  setValue(e) {
    if (!this.dragTargetRect) return;
    const leftBound = this.dragTargetRect.x;
    const rightBound = this.dragTargetRect.right;
    const percent = percentWithinRange(leftBound, rightBound, e.clientX);

    const { min, max } = this.props.config;
    const value = valueFromPercent(min, max, percent)
    this.saveValue(value);
  }

  saveValue(value) {
    const { min, max, step, prop } = this.props.config;
    const smoothedValue = smoothToStep(value, step);
    this.props.onChange(
      prop,
      clamp(min, max, smoothedValue)
    );
    this.props.setFocused(prop);
  }

  percentage() {
    const { config, value } = this.props;
    return percentWithinRange(config.min, config.max, value) * 100;
  }
}
