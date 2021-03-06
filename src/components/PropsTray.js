import React from 'react'
import {
  bool, func, object,
} from 'prop-types'
import Slider from 'components/ui/Slider'
import Input from 'components/ui/Input'
import Switcher from 'components/ui/Switcher'
import Button from 'components/ui/Button'
import Tray from './Tray'
import styles from './Tray.scss'

export default class PropsTray extends React.Component {
  static propTypes = {
    isOpen: bool.isRequired,
    onClickExpander: func.isRequired,
    pattern: object,
    onChangeProp: func.isRequired,
    onFireButton: func,
  };

  constructor(props) {
    super(props)
    this.state = {
      focusedControl: null,
    }
  }

  render() {
    const { pattern, isOpen, onClickExpander } = this.props
    return pattern && (
      <Tray side="right" isOpen={isOpen}>
        <button className={styles.hoverIcon} onClick={onClickExpander} />
        {isOpen && (
          <div className={styles.content}>
            {pattern.propConfig.map(this.renderControl)}
          </div>
        )}
      </Tray>
    )
  }

  renderControl = (config) => {
    const { pattern } = this.props
    const value = pattern.props[config.prop]
    const type = config && config.type
    switch (type) {
      case 'slider':
        return this.renderSlider(config, value)
      case 'input':
        return this.renderInput(config, value)
      case 'switcher':
        return this.renderSwitcher(config, value)
      case 'button':
        return this.renderButton(config)
    }
    return null
  }

  renderSlider(config, value) {
    return (
      <Slider
        key={config.prop}
        config={config}
        value={value}
        onChange={this.props.onChangeProp}
        isFocused={this.state.focusedControl === config.prop}
        setFocused={this.setFocused}
      />
    )
  }

  renderInput(config, value) {
    return (
      <Input
        key={config.prop}
        config={config}
        value={value}
        onChange={this.props.onChangeProp}
        isFocused={this.state.focusedControl === config.prop}
        setFocused={this.setFocused}
      />
    )
  }

  renderSwitcher(config, value) {
    return (
      <Switcher
        key={config.prop}
        config={config}
        value={value}
        onChange={this.props.onChangeProp}
        isFocused={this.state.focusedControl === config.prop}
        setFocused={this.setFocused}
      />
    )
  }

  renderButton(config) {
    return (
      <Button
        key={config.callback}
        config={config}
        onClick={this.props.onFireButton}
      />
    )
  }

  setFocused = focusedControl => this.setState({ focusedControl });
}
