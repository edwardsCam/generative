import React from 'react';
import { bool, func } from 'prop-types';
import PatternSelector from 'components/ui/PatternSelector';
import patternManifest from 'patterns/manifest';
import Tray from './Tray.js';

export default class PatternTray extends React.Component {

  static propTypes = {
    isOpen: bool.isRequired,
    onClickExpander: func.isRequired,
    onSelectPattern: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderPatternSelector = this.renderPatternSelector.bind(this);
  }

  render() {
    return (
      <Tray side='left' isOpen={this.props.isOpen} >
        <div className='hover-icon' onClick={this.props.onClickExpander} />
        {this.props.isOpen && (
          <div className='tray-content'>
            { patternManifest.map(this.renderPatternSelector) }
          </div>
        )}
      </Tray>
    );
  }

  renderPatternSelector(pattern) {
    return (
      <PatternSelector
        key={pattern.name}
        pattern={pattern}
        onSelectPattern={this.props.onSelectPattern}
      />
    );
  }
}
