import React from 'react';
import { bool, func } from 'prop-types';
import PatternSelector from 'components/ui/PatternSelector';
import patternManifest from 'patterns/manifest';
import Tray from './Tray.js';
import styles from './Tray.scss';

export default class PatternTray extends React.Component {

  static propTypes = {
    isOpen: bool.isRequired,
    onClickExpander: func.isRequired,
    onSelectPattern: func.isRequired,
  };

  render() {
    return (
      <Tray side='left' isOpen={this.props.isOpen} >
        <button className={styles.hoverIcon} onClick={this.props.onClickExpander} />
        {this.props.isOpen && (
          <div className={styles.content}>
            { patternManifest.map(this.renderPatternSelector) }
          </div>
        )}
      </Tray>
    );
  }

  renderPatternSelector = pattern => {
    return (
      <PatternSelector
        key={pattern.name}
        pattern={pattern}
        onSelectPattern={this.props.onSelectPattern}
      />
    );
  }
}
