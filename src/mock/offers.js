import { OFFERS, EVENTS, MAX_OFFERS } from '../const';
import { getRandomArrayElement, getRandomInteger } from '../utils';
import { nanoid } from 'nanoid';


const createOfferDescription = () => ({
  id: nanoid(),
  title: getRandomArrayElement(OFFERS),
  price: getRandomInteger(500, 5000)
});

const createOfferbyType = (type) => ({
  type: type,
  offers: Array.from({ length: getRandomInteger(1, MAX_OFFERS) }, createOfferDescription)
});

const getOffers = () => {
  const offers = [];
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
  let offerItem;
  allOffers.forEach((offer) => {
    offer.offers.forEach((item) => {
      if (item.id === id) {
        offerItem = item;
      }
    });
  });
  return offerItem;
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

const getOffersIds = (type) => {
  const offersId = [];
  allOffers.forEach((offer) => {
    if (offer.type === type) {
      offer.offers.forEach((element) => offersId.push(element.id));
    }
  });
  return offersId;
};

export { getOffersIdByType, getOfferById, getOffersByType, getOffersIds };


