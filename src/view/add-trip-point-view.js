import { TRIP_POINT_FORM } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import * as dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createCityElements(cities) {
  return (
    cities.map((city) => (`<option value="${city}"></option>`)).join(' ')
  );
}

function createEventsList(allEvents) {
  return (allEvents.map((event) => (
    `<div class="event__type-item">
      <input id="event-type-${event}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${event}">
      <label class="event__type-label  event__type-label--${event}" for="event-type-${event}-1">${event}</label>
     </div>`))
    .join(''));
}

function createDestinationElement (destination) {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPictureElements(destination.pictures)}
        </div>
      </div>
    </section>`);
}

function createOffersList(allOffers, checkedOffers = []) {
  const newOffers = [];
  let counter = 1;
  allOffers.forEach((offer) => {
    const isChecked = checkedOffers.includes(offer) ? 'checked' : '';
    newOffers.push(`
      <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.split(' ').join('-')}-${counter}" type="checkbox" name="event-offer-${offer.title.split(' ').join('-')}" data-id="${offer.id}" ${isChecked}>
      <label class="event__offer-label" for="event-offer-${offer.title.split(' ').join('-')}-${counter}">
        <span class="event__offer-title">${offer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`);
    counter += 1;
  });

  return newOffers.join('');
}

function createPictureElements(pictures) {

  return (
    pictures.map((picture) => (`<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
    )).join(' ')
  );
}

function createNewTripPointTemplate(tripPoints, tripPointsModel) {
  const { basePrice, dateFrom, dateTo, destination, type } = tripPoints;

  const destinations = tripPointsModel.getDestinationById(destination);

  const allOffers = tripPointsModel.getOffersByType(type);

  const events = tripPointsModel.offers.map((offer) => offer.type);
  const cities = tripPointsModel.destinations.map((city) => city.name);


  return (`<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventsList(events)}
              </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinations ? destinations.name : ''}" list="destination-list-1" required>
          <datalist id="destination-list-1">
            ${createCityElements(cities)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? dayjs(dateFrom).format('DD/MM/YY HH:mm') : ''}" required>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? dayjs(dateTo).format('DD/MM/YY HH:mm') : ''}" required>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" required>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createOffersList(allOffers)}
          </div>
        </section>

        ${destinations ? createDestinationElement(destinations) : ''}
      </section>
    </form>
  </li>`);
}

export default class NewTripPointView extends AbstractStatefulView {
  #tripPointsModel = null;
  #handleFormSubmit = null;
  #handleFormCancel = null;
  #datePickerFrom = null;
  #datePickerTo = null;


  constructor({ tripPointsModel, onFormSubmit, onFormCancel }) {
    super();
    this.#tripPointsModel = tripPointsModel;
    this._setState(NewTripPointView.parseTripPointToState(TRIP_POINT_FORM));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormCancel = onFormCancel;

    this._restoreHandlers();
  }

  get template() {
    return createNewTripPointTemplate(NewTripPointView.parseTripPointToState(this._state), this.#tripPointsModel);
  }

  removeElement() {
    super.removeElement();

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    } else if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  _restoreHandlers() {

    const form = this.element.querySelector('form');

    form.addEventListener('submit', this.#formSubmitHandler);
    form.addEventListener('reset', this.#formCancelHandler);

    form.querySelector('.event__type-group').addEventListener('change', this.#onTripPointTypeChange);
    form.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    form.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    form.querySelector('.event__available-offers').addEventListener('change', this.#onOfferChange);
    this.#setDatePickers();
  }

  #startDateChangeHandler = ([dateFrom]) => {
    this.updateElement({
      dateFrom: dateFrom,
    });
  };

  #endDateChangeHandler = ([dateTo]) => {
    this.updateElement({
      dateTo: dateTo,
    });
  };

  #setDatePickers() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    this.#datePickerFrom = flatpickr(
      dateFromElement,
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        minDate: 'today',
        maxDate: this._state.dateTo,
        locale: {
          firstDayOfWeek: 1
        },
        onChange: this.#startDateChangeHandler,
      }
    );

    this.#datePickerTo = flatpickr(
      dateToElement,
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom ? this._state.dateFrom : 'today',
        locale: {
          firstDayOfWeek: 1
        },
        onChange: this.#endDateChangeHandler,
      }
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(NewTripPointView.parseStateToTripPoint(this._state));
  };

  #formCancelHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormCancel();
  };

  #onCancelButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleFormCancel();
  };

  #onDestinationChange = (evt) => {
    evt.preventDefault();
    const newDestination = this.#tripPointsModel.destinations.find((destination) => destination.name === evt.target.value);

    if (newDestination) {
      this.updateElement({
        destination: newDestination.id,
        description: newDestination.description,
      });
    } else {
      evt.target.value = '';
    }
  };

  #onTripPointTypeChange = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this.updateElement({
        type: evt.target.value,
        offers: [],
      });
    }
  };

  #onPriceChange = (evt) => {
    evt.preventDefault();

    const newPrice = Math.abs(Math.round(evt.target.value));

    if (!isNaN(newPrice)) {
      this._setState({
        basePrice: newPrice
      });
      return;
    }
    this._setState({
      basePrice: ''
    });
  };

  #onOfferChange = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
      const offersIds = checkedOffers.map((offer) => offer.dataset.id);
      this._setState({
        offers: [...offersIds]
      });

    }
  };


  static parseTripPointToState = (tripPoint) => ({ ...tripPoint });
  static parseStateToTripPoint = (state) => ({ ...state });

}
