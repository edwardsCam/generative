// get around to it at the end of the event loop
export default function lazily(callback) {
  return new Promise(resolve => {
    setTimeout(() => {
      callback();
      resolve();
    }, 0);
  });
}
