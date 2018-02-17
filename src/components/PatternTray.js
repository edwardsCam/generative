import React from 'react';
import { bool, func } from 'prop-types';
import PatternSelector from 'components/ui/PatternSelector';
import patternManifest from 'patterns/manifest';
import Tray from './Tray.js';
import styles from './Tray.scss';
import { floatRight } from '../style/main.scss';

export default class PatternTray extends React.Component {

  static propTypes = {
    isOpen: bool.isRequired,
    onClickExpander: func.isRequired,
    onSelectPattern: func.isRequired,
    openHelpModal: func.isRequired,
  };

  render() {
    return (
      <Tray side='left' isOpen={this.props.isOpen} >
        <button className={styles.hoverIcon} onClick={this.props.onClickExpander} />
        {this.props.isOpen && (
          <div className={styles.content}>
            <div>
              { patternManifest.map(this.renderPatternSelector) }
            </div>
            {this.renderInfoPanel()}
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

  renderInfoPanel() {
    return (
      <div className={styles.infoPanel}>
        <div>
          <button onClick={this.props.openHelpModal}>
            {'? help ?'}
          </button>
          <button
            className={floatRight}
            onClick={() => window.open('https://github.com/edwardsCam/generative')}
          >
            github
          </button>
        </div>
        <div className={styles.love}>
          {'Made with <3 by Cameron Edwards'}
        </div>
      </div>
    );
  }
}
