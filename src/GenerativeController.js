import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import { palette } from 'utils/Color';

import InfinityCycle from 'patterns/InfinityCycle';

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

  this.animateActivePattern = (time, delta, props) => {
    if (activePattern) {
      activePattern(time, delta, props);
      render();
    }
  };
  this.setActivePattern = (pattern, initialProps) => {
    switch (pattern) {
      case 'InfinityCycle':
        activePattern = new InfinityCycle(scene, initialProps);
        break;
    }
  };
  this.getDomElement = () => renderer.domElement;

  //document.body.appendChild(renderer.domElement);
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
