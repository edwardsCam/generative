export default function buildGrid(resolution) {
  const g = [];
  for (let i = 0; i < resolution; i++) {
    g.push([]);
    for (let j = 0; j < resolution; j++) {
      g[i].push(false);
    }
  }
  return g;
}
