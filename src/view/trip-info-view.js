import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../utils.js';
import { MAX_DESTINATION_LENGTH } from '../const.js';
import { getDestinationById, getOfferById } from '../utils.js';

const humanizeTripDates = (startDate, endDate) => {
  const start = startDate.split(' ').reverse();
  const end = endDate.split(' ').reverse();

  if (start[0] === end[0]) {
    end.shift();
  }

  return `${start.join(' ')}&nbsp;&mdash;&nbsp;${end.join(' ')}`;

};

function createTripInfoTemplate(tripPoints, destinations, allOffers) {

  const destinationsList = [];
  let sum = 0;
  tripPoints.forEach((tripPoint) => {
    destinationsList.push(getDestinationById(tripPoint.destination, destinations).name);

    const OffersList = tripPoint.offers.map((offerId) => getOfferById(offerId, allOffers));
    const offersPrice = OffersList.reduce((total, offer) => total + offer.price, 0);
    sum += tripPoint.basePrice + offersPrice;
  });

  const startDate = humanizeDate(tripPoints[0].dateFrom);
  const endDate = humanizeDate(tripPoints[tripPoints.length - 1].dateTo);

  const humanizeTripDate = (humanizeTripDates(startDate, endDate));

  return (`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
  <h1 class="trip-info__title">${destinationsList.length > MAX_DESTINATION_LENGTH ? `${destinationsList[0]} &mdash; ... &mdash; ${destinationsList[destinationsList.length - 1]}` : destinationsList.join(' &mdash; ')}</h1>

    <p class="trip-info__dates">${humanizeTripDate}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>
  </p>
</section>`);
}

export default class TripInfoView extends AbstractView {
  #tripPoints = null;
  #destinations = null;
  #offers = null;

  constructor ({tripPoints, destinations, offers}) {
    super();
    this.#tripPoints = tripPoints;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#tripPoints, this.#destinations, this.#offers);
  }
}
