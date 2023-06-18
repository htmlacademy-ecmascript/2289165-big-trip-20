import { createIdGenerator, getRandomArrayElement, getRandomInteger } from '../utils';
import { EVENTS, CITIES } from '../const';
import { getOffersIds } from './offers';
import { nanoid } from 'nanoid';


const dateStep = createIdGenerator();

const getTripPoint = () => {
  const pointType = getRandomArrayElement(EVENTS);
  const offerIds = getOffersIds(pointType);

  const tripPoint = {
    id: nanoid(),
    basePrice: getRandomInteger(5000, 20000),
    dateFrom: new Date(new Date().getTime() + (dateStep() * getRandomInteger(500, 550) * 60 * 60 * 24)),
    dateTo: new Date(new Date().getTime() + (dateStep() * 550 * 60 * 60 * 24)),
    destination: getRandomInteger(1, CITIES.length),
    isFavorite: Math.random() < 0.5,
    offers: offerIds.slice(0, offerIds.length - getRandomInteger(0, offerIds.length)),
    type: pointType
  };
  return tripPoint;
};

export { getTripPoint };
