import React from 'react';
import { object, array, func } from 'prop-types';
import GenerativeController from 'GenerativeController';

export default class Generative extends React.Component {

  static propTypes = {
    pattern: object,
    pendingActions: array,
    resetPendingActions: func,
  }

  constructor(props) {
    super(props);
    this.controller = new GenerativeController();
    this.controller.render();
    this.localTime = 0;
    this.globalTime = 0;
  }

  render() {
    return <div ref={me => { this.container = me; }} />;
  }

  componentDidMount() {
    this.container.appendChild(this.controller.getDomElement());
    requestAnimationFrame(this.animate);
  }

  componentWillReceiveProps(nextProps) {
    const { pattern } = nextProps;
    if (pattern && !this.isCurrentPattern(pattern)) {
      this.controller.setActivePattern(pattern);
      this.localTime = 0;
    }
  }

  animate = now => {
    const nowInSeconds = now / 1000;
    const delta = nowInSeconds - this.globalTime;
    this.globalTime = nowInSeconds;

    const { pattern, pendingActions, resetPendingActions } = this.props;
    if (pattern && this.isCurrentPattern(pattern)) {
      if (pendingActions.length) {
        pendingActions.forEach(action => {
          const result = this.controller.callPatternAction(action);
          if (result.reset) {
            this.localTime = 0;
          }
        });
        resetPendingActions();
      }
      this.localTime += delta;
      this.controller.animateActivePattern(this.localTime, delta, pattern.props);
    }
    requestAnimationFrame(this.animate);
  }

  isCurrentPattern = pattern => this.controller.getActivePatternName() === pattern.name;
}
