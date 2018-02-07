import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import { palette } from 'utils/Color';
import { get, result } from 'lodash';

import InfinityCycle from 'patterns/InfinityCycle';
import Roots from 'patterns/Roots';

export default function GenerativeController() {
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new WebGLRenderer();
  let activePattern = null;

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(palette[0], 1);
  camera.position.set(0, 0, 10);

  this.render = render;
  this.animateActivePattern = (time, delta, props) => {
    if (!activePattern) return;

    activePattern.animate(time, delta, props);
    render();
  };
  this.setActivePattern = pattern => {
    this.clearScene();
    switch (pattern.name) {
      case 'Infinity Cycle':
        activePattern = {
          name: pattern.name,
          animate: new InfinityCycle(scene, pattern.props),
        };
        break;
      case 'Roots':
        activePattern = {
          name: pattern.name,
          animate: new Roots(scene, pattern.props),
        };
        break;
      default:
        activePattern = null;
        break;
    }
  };
  this.getActivePatternName = () => get(activePattern, 'name', '');
  this.getDomElement = () => renderer.domElement;
  this.clearScene = () => {
    while (scene.children.length) {
      const c = scene.children[0];
      result(c, 'geometry.dispose');
      result(c, 'material.dispose');
      scene.remove(c);
    }
  };

  window.addEventListener('resize', e => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }, false);

  function render() {
    renderer.render(scene, camera);
  }
}
