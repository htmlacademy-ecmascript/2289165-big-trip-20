const DATE_FORMAT = 'DD MMM YYYY';
const TIME_FORMAT = 'HH:mm';
const MAX_DESTINATION_LENGTH = 3;

const TRIP_POINT_FORM = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'taxi'
};


const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const UserAction = {
  UPDATE_TRIP_POINT: 'UPDATE_TRIP_POINT',
  ADD_TRIP_POINT: 'ADD_TRIP_POINT',
  DELETE_TRIP_POINT: 'DELETE_TRIP_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const EmptyListText = {
  Everything: 'Click New Event to create your first point',
  Future: 'There are no future events now',
  Present: 'There are no present events now',
  Past: 'There are no past events now'
};


export { DATE_FORMAT, TIME_FORMAT, FilterType, Mode, SortType, UserAction, UpdateType, TRIP_POINT_FORM, MAX_DESTINATION_LENGTH, EmptyListText
};
