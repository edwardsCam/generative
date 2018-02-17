import { BATCH_SIZE } from 'constants/batch';
import lazily from 'utils/lazily';

export default function clearScene(scene) {

  const chunks = [];
  let i, j;
  for (i = 0, j = scene.children.length; i < j; i += BATCH_SIZE) {
    chunks.push( scene.children.slice(i, i + BATCH_SIZE) );
  }

  return Promise.all(chunks.map(chunk => lazily(() => {
    let i = chunk.length
    while (i--) {
      const c = chunk[i];
      if (c.geometry && c.geometry.dispose) c.geometry.dispose();
      if (c.material && c.material.dispose) c.material.dispose();
      scene.remove(c);
    }
  })));
}
