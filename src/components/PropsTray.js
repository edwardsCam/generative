import React from 'react';
import { bool, func, object, objectOf } from 'prop-types';
import Slider from 'components/ui/Slider';
import Tray from './Tray.js';

export default class PropsTray extends React.Component {

  static propTypes = {
    isOpen: bool.isRequired,
    onClickExpander: func.isRequired,
    props: object.isRequired,
    propConfig: object.isRequired,
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
    const { props } = this.props;
    return (
      <Tray side='right' isOpen={this.props.isOpen} >
        <div className='hover-icon' onClick={this.props.onClickExpander}>
          {/* this.props.isOpen ? '>' : '<' */}
        </div>
        {this.props.isOpen && (
          <div className='tray-content'>
            {Object.keys(props).map(this.renderControl)}
          </div>
        )}
      </Tray>
    );
  }

  renderControl(prop) {
    const config = this.props.propConfig[prop];
    const value = this.props.props[prop];
    if (config.type === 'slider') {
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
