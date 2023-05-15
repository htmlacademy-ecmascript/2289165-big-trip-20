import { CITIES, DESCRIPTIONS, MAX_PICTURES } from '../const';
import { createIdGenerator, getRandomArrayElement, getRandomInteger } from '../utils';



const createPicture = () => ({
  src: `https://loremflickr.com/248/152?random=${Math.random()}`,
  description: getRandomArrayElement(DESCRIPTIONS)
});

const randomDestinationID = createIdGenerator();

const createDestination = (city) => ({
  id: randomDestinationID(),
  description: getRandomArrayElement(DESCRIPTIONS),
  name: city,
  pictures: Array.from({ length: getRandomInteger(0, MAX_PICTURES) }, createPicture)
});

const getDestinations = () => {
  const destinations = new Array(CITIES.length);
  for (let i = 0; i < CITIES.length; i++) {
    destinations[i] = createDestination(CITIES[i]);
  }
  return destinations;
};

const allDestinations = getDestinations();

const getDestinationById = (id) => {
  const destination = allDestinations.find((element) => element.id === id);
  return destination;
};

export { getDestinationById };
