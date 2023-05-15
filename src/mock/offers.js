import { OFFERS, EVENTS, MAX_OFFERS } from '../const';
import { createIdGenerator, getRandomArrayElement, getRandomInteger } from '../utils';

const offerId = createIdGenerator();

const createOfferDescription = () => ({
  id: offerId(),
  title: getRandomArrayElement(OFFERS),
  price: getRandomInteger(500, 5000)
});

const createOfferbyType = (type) => ({
  type: type,
  offers: Array.from({ length: getRandomInteger(1, MAX_OFFERS) }, createOfferDescription)
});

const getOffers = () => {
  const offers = new Array(EVENTS.length);
  for (let i = 0; i < EVENTS.length; i++) {
    offers[i] = createOfferbyType(EVENTS[i]);
  }
  return offers;
};

const allOffers = getOffers();

const getOffersIdByType = (type) => {
  const offersId = [];
  allOffers.forEach((element) => {
    if (element.type === type) {
      element.offers.forEach((offer) => offersId.push(offer.id));
    }
  });
  return offersId;
};

const getOfferById = (id) => {
  let offerById;
  allOffers.forEach((element) => {
    element.offers.forEach((offer) => {
      if (offer.id === id.id) {
        offerById = offer;
      }
    });
  });
  return offerById;
};

const getOffersByType = (type) => {
  let offersByType = [];
  allOffers.forEach((element) => {
    if (element.type === type) {

      offersByType = element.offers;
    }
  });
  return offersByType;
};

export { getOffersIdByType, getOfferById, getOffersByType };


