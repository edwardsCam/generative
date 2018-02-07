// Returns true if there exists a single square that has not been populated.
const hasEmptySpaces = grid => grid.some(r => r.some(c => c === true));

export default hasEmptySpaces;
