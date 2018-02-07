import React from 'react';
import { bool, func, object, objectOf } from 'prop-types';
import { get } from 'lodash';
import Slider from 'components/ui/Slider';
import Tray from './Tray.js';

export default class PropsTray extends React.Component {

  static propTypes = {
    isOpen: bool.isRequired,
    onClickExpander: func.isRequired,
    pattern: object,
    onChangeProp: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      focusedControl: null,
    };
    this.renderControl = this.renderControl.bind(this);
    this.setFocused = this.setFocused.bind(this);
  }

  render() {
    const { pattern, isOpen, onClickExpander } = this.props;
    return pattern && (
      <Tray side='right' isOpen={isOpen} >
        <div className='hover-icon' onClick={onClickExpander} />
        {isOpen && (
          <div className='tray-content'>
            {Object.keys(pattern.props).map(this.renderControl)}
          </div>
        )}
      </Tray>
    );
  }

  renderControl(prop) {
    const { pattern } = this.props;
    const config = pattern.propConfig[prop];
    const value = pattern.props[prop];
    if (get(config, 'type') === 'slider') {
      return (
        <Slider
          key={config.prop}
          config={config}
          value={value}
          onChange={this.props.onChangeProp}
          isFocused={this.state.focusedControl === config.prop}
          setFocused={this.setFocused}
        />
      );
    }
    return null;
  }

  setFocused(focusedControl) {
    this.setState({ focusedControl });
  }
}
