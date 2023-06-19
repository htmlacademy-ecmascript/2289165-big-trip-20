const EVENTS = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const CITIES = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
  'Strasbourg',
  'Florence',
  'Salzburg',
  'Rome',
  'Dublin',
  'Paris',
  'Vienna',
  'Prague',
  'Berlin',
  'London',
  'Copenhagen',
  'Budapest',
  'Oslo',
  'Barcelona',
  'Venice',
  'Stockholm',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const OFFERS = [
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train',
  'Order Uber',
  'Rent a car',
  'Add breakfast',
  'Book tickets',
  'Lunch in city'
];

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
  DELETE_TRIP_POINT: 'DELETE_TRIP_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const EmptyListText = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESET]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};


const MAX_PICTURES = 5;
const MAX_OFFERS = 5;
const TRIP_POINTS_COUNT = 3;
const DATE_FORMAT = 'DD MMM YYYY';
const TIME_FORMAT = 'HH:mm';
const MAX_DESTINATION_LENGTH = 3;

export {
  EVENTS, CITIES, DESCRIPTIONS, OFFERS, MAX_PICTURES, MAX_OFFERS, TRIP_POINTS_COUNT,
  DATE_FORMAT, TIME_FORMAT, FilterType, Mode, SortType, UserAction, UpdateType, TRIP_POINT_FORM, MAX_DESTINATION_LENGTH, EmptyListText
};
