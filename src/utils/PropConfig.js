const slider = (prop, title, min, max, step) => ({
  prop, title, min, max, step, type: 'slider',
});

const boolean = (prop) => ({
  prop, type: 'boolean',
});

export {
  slider,
  boolean,
}
