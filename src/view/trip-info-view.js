import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../utils.js';
import { getDestinationById } from '../mock/destinations.js';
import { getOfferById } from '../mock/offers.js';
import { MAX_DESTINATION_LENGTH } from '../const.js';

const humanizeTripDates = (startDate, endDate) => {
  const start = startDate.split(' ').reverse();
  const end = endDate.split(' ').reverse();

  if (start[0] === end[0]) {
    end.shift();
  }

  return `${start.join(' ')}&nbsp;&mdash;&nbsp;${end.join(' ')}`;

};

function createTripInfoTemplate(tripPoints) {
  const destinations = [];
  let sum;
  tripPoints.forEach((tripPoint) => {
    destinations.push(getDestinationById(tripPoint.destination).name);

    const tripPointOffers = tripPoint.offers.map((offerId) => getOfferById(offerId));
    const offersPrice = tripPointOffers.reduce((total, offer) => total + offer.price, 0);
    sum = tripPoint.basePrice + offersPrice;
  });

  const startDate = humanizeDate(tripPoints[0].dateFrom);
  const endDate = humanizeDate(tripPoints[tripPoints.length - 1].dateTo);

  const humanizeTripDate = (humanizeTripDates(startDate, endDate));

  return (`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
  <h1 class="trip-info__title">${destinations.length > MAX_DESTINATION_LENGTH ? `${destinations[0]} &mdash; ... &mdash; ${destinations[destinations.length - 1]}` : destinations.join(' &mdash; ')}</h1>

    <p class="trip-info__dates">${humanizeTripDate}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>
  </p>
</section>`);
}

export default class TripInfoView extends AbstractView {
  #tripPoints = null;

  constructor ({tripPoints}) {
    super();
    this.#tripPoints = tripPoints;
  }

  get template() {
    return createTripInfoTemplate(this.#tripPoints);
  }
}
