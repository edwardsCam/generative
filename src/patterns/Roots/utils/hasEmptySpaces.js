/**
  hasEmptySpaces:
    Returns true if there exists a single square that has not been populated.
*/
export default function hasEmptySpaces(grid) {
  return grid.some(function (r) {
    return r.some(function (c) {
      return c === true;
    });
  });
}
