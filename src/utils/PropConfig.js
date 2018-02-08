const slider = (prop, title, min, max, step = 1) => ({
  prop, title, min, max, step, type: 'slider',
});

const boolean = (prop) => ({
  prop, type: 'boolean',
});

const colorSliders = [
  slider('red', 'Red', 0, 255),
  slider('green', 'Green', 0, 255),
  slider('blue', 'Blue', 0, 255),
];

export {
  slider,
  boolean,
  colorSliders,
}