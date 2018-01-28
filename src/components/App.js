import React from 'react';
import Generative from 'components/Generative';
import PatternTray from 'components/PatternTray';
import PropsTray from 'components/PropsTray';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      patternTrayIsOpen: false,
      propsTrayIsOpen: false,
      activePattern: 'InfinityCycle',
      activePatternProps: require('patterns/InfinityCycle/defaultProps').default,
    };
    this.onClickLeftExpander = this.onClickLeftExpander.bind(this);
    this.onClickRightExpander = this.onClickRightExpander.bind(this);
  }

  render() {
    return (
      <div className='app'>
        <Generative
          pattern={this.state.activePattern}
          patternProps={this.state.activePatternProps}
        />
        <PatternTray
          isOpen={this.state.patternTrayIsOpen}
          onClickExpander={this.onClickLeftExpander}
        />
        <PropsTray
          isOpen={this.state.propsTrayIsOpen}
          onClickExpander={this.onClickRightExpander}
        />
      </div>
    );
  }

  onClickLeftExpander() {
    this.setState({
      patternTrayIsOpen: !this.state.patternTrayIsOpen
    });
  }

  onClickRightExpander() {
    this.setState({
      propsTrayIsOpen: !this.state.propsTrayIsOpen
    });
  }

  setPatternProp(prop, value) {
    this.setState({
      activePatternProps: Object.assign(this.state.activePatternProps, { [prop]: value })
    });
  }
}
