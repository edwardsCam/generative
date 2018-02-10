import React from 'react';
import Generative from 'components/Generative';
import PatternTray from 'components/PatternTray';
import PropsTray from 'components/PropsTray';
import { cloneDeep, get } from 'lodash';
import styles from './App.css';
import '../../style/main.css'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      patternTrayIsOpen: true,
      propsTrayIsOpen: true,
      activePattern: null,
    };
    this.onClickLeftExpander = this.onClickLeftExpander.bind(this);
    this.onClickRightExpander = this.onClickRightExpander.bind(this);
    this.setPatternProp = this.setPatternProp.bind(this);
    this.handleSelectPattern = this.handleSelectPattern.bind(this);
  }

  render() {
    const { activePattern, patternTrayIsOpen, propsTrayIsOpen } = this.state;
    return (
      <div className={styles.app}>
        <Generative pattern={activePattern} />
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
    const { activePattern } = this.state;
    activePattern.props = Object.assign(activePattern.props, { [prop]: value });
    this.setState({ activePattern });
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
