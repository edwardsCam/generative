// Returns true if there exists a single square that has not been populated.
const hasEmptySpaces = (grid, resolution) => grid.count < resolution * resolution;

export default hasEmptySpaces;
