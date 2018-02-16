import { result } from 'lodash';

export default function clearScene(scene) {
  while (scene.children.length) {
    const c = scene.children[0];
    result(c, 'geometry.dispose');
    result(c, 'material.dispose');
    scene.remove(c);
  }
}
