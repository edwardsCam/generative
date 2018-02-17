import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import clearScene from 'utils/ClearScene';

import InfinityCycle from 'patterns/InfinityCycle';
import Roots from 'patterns/Roots';
import Chipboard from 'patterns/Chipboard';

export default function GenerativeController() {
  const scene = new Scene();
  scene.autoUpdate = false;
  const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new WebGLRenderer();
  renderer.sortObjects = false;
  let activePattern = null;

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xf7f7e2, 1);
  camera.position.set(0, 0, 10);

  this.animateActivePattern = (time, delta, props) => {
    if (activePattern && activePattern.animate) {
      return activePattern.animate(time, delta, props).then(() => {
        render();
      });
    }
    return Promise.reject();
  };
  this.callPatternAction = callback => {
    if (activePattern && activePattern[callback]) {
      return activePattern[callback]();
    }
    return Promise.resolve();
  };
  this.setActivePattern = pattern => {
    return clearScene(scene).then(() => {
      switch (pattern.name) {
        case 'Infinity Cycle':
          activePattern = {
            name: pattern.name,
            ...(new InfinityCycle(scene, pattern.props))
          };
          break;
        case 'Roots':
          activePattern = {
            name: pattern.name,
            ...(new Roots(scene, pattern.props))
          };
          break;
        case 'Chipboard':
          activePattern = {
            name: pattern.name,
            ...(new Chipboard(scene, pattern.props))
          };
          break;
        default:
          activePattern = null;
          break;
      }
    });
  };
  this.getActivePatternName = () => activePattern ? activePattern.name : '';
  this.getDomElement = () => renderer.domElement;

  window.addEventListener('resize', e => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }, false);

  render();

  function render() {
    renderer.render(scene, camera);
  }
}
