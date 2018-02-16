import React from 'react';
import Generative from 'components/Generative';
import PatternTray from 'components/PatternTray';
import PropsTray from 'components/PropsTray';
import { cloneDeep, get } from 'lodash';
import styles from './App.scss';
import '../main.scss'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      patternTrayIsOpen: true,
      propsTrayIsOpen: true,
      activePattern: null,
      pendingActions: [],
    };
    this.onClickLeftExpander = this.onClickLeftExpander.bind(this);
    this.onClickRightExpander = this.onClickRightExpander.bind(this);
    this.setPatternProp = this.setPatternProp.bind(this);
    this.handleSelectPattern = this.handleSelectPattern.bind(this);
  }

  render() {
    const { activePattern, patternTrayIsOpen, propsTrayIsOpen, pendingActions } = this.state;
    return (
      <div className={styles.app}>
        <Generative
          pattern={activePattern}
          pendingActions={pendingActions}
          resetPendingActions={this.resetPendingActions}
        />
        <PatternTray
          isOpen={patternTrayIsOpen}
          onClickExpander={this.onClickLeftExpander}
          onSelectPattern={this.handleSelectPattern}
        />
        {activePattern && (
          <PropsTray
            isOpen={propsTrayIsOpen}
            onClickExpander={this.onClickRightExpander}
            pattern={activePattern}
            onChangeProp={this.setPatternProp}
            onFireButton={this.handleButtonFire}
          />
        )}
      </div>
    );
  }

  onClickLeftExpander() {
    this.setState({ patternTrayIsOpen: !this.state.patternTrayIsOpen });
  }
  onClickRightExpander() {
    this.setState({ propsTrayIsOpen: !this.state.propsTrayIsOpen });
  }

  setPatternProp(prop, value) {
    if (!prop) return;
    const { activePattern } = this.state;
    activePattern.props = Object.assign(activePattern.props, { [prop]: value });
    this.setState({ activePattern });
  }

  handleButtonFire = callbackName => {
    const pendingActions = this.state.pendingActions.slice();
    pendingActions.push(callbackName);
    this.setState({ pendingActions });
  }

  resetPendingActions = () => {
    this.setState({ pendingActions: [] });
  }

  handleSelectPattern = pattern => {
    const { name } = pattern;
    if (name === get(this.state, 'activePattern.name')) return;
    switch (name) {
      case 'Infinity Cycle':
        this.setState({
          activePattern: {
            name,
            props: this.patternDefaultProps('InfinityCycle'),
            propConfig: this.patternPropConfig('InfinityCycle'),
          }
        });
        break;
      case 'Roots':
        this.setState({
          activePattern: {
            name,
            props: this.patternDefaultProps('Roots'),
            propConfig: this.patternPropConfig('Roots'),
          }
        });
        break;
      case 'Chipboard':
        this.setState({
          activePattern: {
            name,
            props: this.patternDefaultProps('Chipboard'),
            propConfig: this.patternPropConfig('Chipboard'),
          }
        });
        break;
      default:
        this.setState({ activePattern: null });
        break;
    }
  }

  patternDefaultProps(name) {
    return cloneDeep(
      require(`patterns/${name}/defaultProps`).default
    );
  }
  patternPropConfig(name) {
    return cloneDeep(
      require(`patterns/${name}/propConfig`).default
    );
  }
}
