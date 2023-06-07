import {filter} from '../utils.js';

function generateFilter(tripPoints) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      filterType: filterType,
      isDisabled: !filterPoints(tripPoints).length,
    }),
  );
}

export {generateFilter};
