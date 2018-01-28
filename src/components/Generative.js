import React from 'react';
import { object, string } from 'prop-types';
import GenerativeController from 'GenerativeController';

export default class Generative extends React.Component {

  static propTypes = {
    pattern: string,
    patternProps: object,
  }

  static defaultProps = {
    pattern: 'InfinityCycle',
    patternProps: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      controller: new GenerativeController(),
      time: 0,
    };
    this.state.controller.setActivePattern(props.pattern, props.patternProps);
    this.animate = this.animate.bind(this);
  }

  render() {
    return (
      <div ref={me => { this.container = me; }} />
    );
  }

  componentDidMount() {
    this.container.appendChild(this.state.controller.getDomElement());
    requestAnimationFrame(this.animate);
  }

  animate(now) {
    const nowInSeconds = now / 1000;
    const delta = nowInSeconds - this.state.time;
    this.setState({ time: nowInSeconds });
    this.state.controller.animateActivePattern(nowInSeconds, delta, this.props.patternProps);
    requestAnimationFrame(this.animate);
  }
}
