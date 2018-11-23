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
    this.reset();
  }

  render() {
    return <div ref={me => { this.container = me; }} />;
  }

  componentDidMount() {
    this.container.appendChild(this.controller.getDomElement());
  }

  componentDidUpdate() {
    const { pattern, pendingActions } = this.props;
    if (pattern && !this.isCurrentPattern(pattern)) {
      this.controller.setActivePattern(pattern).then(this.startAnimating);
    } else if (pendingActions.length) {
      this.startAnimating();
    }
  }

  startAnimating = () => {
    this.reset();
    requestAnimationFrame(this.animate);
  }

  reset = () => {
    this.localTime = 0;
    this.delta = 0;
    this.last = 0;
  }

  animate = now => {
    const nowInSeconds = now / 1000;
    if (!this.last) {
      this.last = nowInSeconds;
    }
    this.delta = nowInSeconds - this.last;
    this.last = nowInSeconds;
    this.localTime += this.delta;

    const { pattern, pendingActions, resetPendingActions } = this.props;
    if (pattern && this.isCurrentPattern(pattern)) {
      Promise.all(pendingActions.map(this.controller.callPatternAction)).then(() => {
        if (pendingActions.length) resetPendingActions();
        this.controller.animateActivePattern(this.localTime, this.delta, pattern.props).then(() => {
          requestAnimationFrame(this.animate);
        }, () => {
          console.log('Animation finished!');
          this.reset();
        });
      });
    }
  }

  isCurrentPattern = pattern => this.controller.getActivePatternName() === pattern.name;
}
