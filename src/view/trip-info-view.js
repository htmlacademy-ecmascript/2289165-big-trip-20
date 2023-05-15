import {createElement} from '../render.js';
import { humanizeDate } from '../utils.js';
import { getDestinationById } from '../mock/destinations.js';

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
  tripPoints.forEach((tripPoint) => {
    destinations.push(getDestinationById(tripPoint.destination).name);
  });

  const startDate = humanizeDate(tripPoints[0].dateFrom);
  const endDate = humanizeDate(tripPoints[tripPoints.length - 1].dateTo);

  const humanizeTripDate = (humanizeTripDates(startDate, endDate));

  return (`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${destinations.join(' &mdash; ')}</h1>

    <p class="trip-info__dates">${humanizeTripDate}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>
</section>`);
}

export default class TripInfoView {

  constructor ({tripPoints}) {
    this.tripPoints = tripPoints;
  }

  getTemplate() {
    return createTripInfoTemplate(this.tripPoints);
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
