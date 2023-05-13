import { createIdGenerator, getRandomArrayElement, getRandomInteger } from '../utils';
import { EVENTS, CITIES } from '../const';
import { getOffersByType } from './offers';

const tripPointId = createIdGenerator();
const dateStep = createIdGenerator();

const getTripPoint = () => {
  const pointType = getRandomArrayElement(EVENTS);
  const offerIds = getOffersByType(pointType);

  const tripPoint = {
    id: tripPointId(),
    basePrice: getRandomInteger(5000, 20000),
    dateFrom: new Date(new Date().getTime() + (dateStep() * getRandomInteger(500, 550) * 60 * 60 * 24)),
    dateTo: new Date(new Date().getTime() + (dateStep() * 550 * 60 * 60 * 24)),
    destination: getRandomInteger(1, CITIES.length),
    isFavourite: Math.random() < 0.5,
    offers: offerIds.slice(0, offerIds.length - getRandomInteger(0, offerIds.length)),
    type: pointType
  };
  return tripPoint;
};

export { getTripPoint };
