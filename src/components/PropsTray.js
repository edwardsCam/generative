import React from 'react';
import { bool, func, object, objectOf } from 'prop-types';
import { get } from 'lodash';
import Slider from 'components/ui/Slider';
import Switcher from 'components/ui/Switcher';
import Tray from './Tray.js';
import styles from './Tray.css';

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
        <div className={styles.hoverIcon} onClick={onClickExpander} />
        {isOpen && (
          <div className={styles.content}>
            {pattern.propConfig.map(this.renderControl)}
          </div>
        )}
      </Tray>
    );
  }

  renderControl(config) {
    const { pattern } = this.props;
    const value = pattern.props[config.prop];
    const type = get(config, 'type');
    if (type === 'slider') {
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
    } else if (type === 'switcher') {
      // TODO
      // return (
      //   <Switcher />
      // );
    }
    return null;
  }

  setFocused(focusedControl) {
    this.setState({ focusedControl });
  }
}
