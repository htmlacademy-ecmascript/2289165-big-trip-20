import {createElement} from '../render.js';
import { getDestinationById } from '../mock/destinations.js';
import { humanizeDate, humanizeTime, getEventLasting } from '../utils.js';
import { getOfferById } from '../mock/offers.js';

function createSelectedOffers (offers) {
  return (
    offers.map((offer) => (`
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      +€&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
    )).join(' ')
  );
}

function createTripPointTemplate(tripPoints) {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, offers, type} = tripPoints;

  const date = humanizeDate(dateFrom);
  const timeFrom = humanizeTime(dateFrom);
  const timeTo = humanizeTime(dateTo);
  const destinationElement = getDestinationById(destination);
  const eventLasting = getEventLasting(dateFrom, dateTo);
  const favorite = isFavorite ? 'event__favorite-btn--active' : '';

  const offersList = [];

  offers.forEach((id) => {
    offersList.push(getOfferById(id));
  });

  return (`<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destinationElement.name} Amsterdam</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${timeFrom}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${timeTo}</time>
        </p>
        <p class="event__duration">${eventLasting}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${createSelectedOffers(offersList)}
      </ul>
      <button class="event__favorite-btn ${favorite}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
}

export default class TripPointView {

  constructor ({tripPoints}) {
    this.tripPoints = tripPoints;
  }

  getTemplate() {
    return createTripPointTemplate(this.tripPoints);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
