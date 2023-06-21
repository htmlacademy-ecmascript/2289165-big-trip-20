import Observable from '../framework/observable.js';
import { UpdateType, TimeLimitForUiBlocker } from '../const';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class TripPointsModel extends Observable {
  #tripPointsApiService = null;

  #tripPoints = [];
  #destinations = [];
  #offers = [];
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimitForUiBlocker.LOWER_LIMIT,
    upperLimit: TimeLimitForUiBlocker.UPPER_LIMIT
  });

  constructor({ tripPointsApiService }) {
    super();
    this.#tripPointsApiService = tripPointsApiService;
  }

  get tripPoints() {
    return this.#tripPoints;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getCities = () => this.#destinations.map((destination) => destination.name);

  getEvents = () => this.#offers.map((offer) => offer.type);

  async init() {
    this.#uiBlocker.block();
    try {
      const tripPoints = await this.#tripPointsApiService.tripPoints;
      const destinations = await this.#tripPointsApiService.destinations;
      const offers = await this.#tripPointsApiService.offers;
      this.#tripPoints = tripPoints.map(this.#adaptToClient);
      this.#destinations = destinations;
      this.#offers = offers;
      this.#uiBlocker.unblock();
    } catch (err) {
      this._notify(UpdateType.ERROR, err);
      this.#tripPoints = [];
      this.#destinations = [];
      this.#offers = [];
      this.#uiBlocker.unblock();
      return;
    }
    this._notify(UpdateType.INIT);
  }

  #adaptToClient(tripPoint) {
    const adaptedTripPoint = {
      ...tripPoint,
      basePrice: tripPoint['base_price'],
      dateFrom: tripPoint['date_from'] !== null ? new Date(tripPoint['date_from']) : tripPoint['date_from'],
      dateTo: tripPoint['date_to'] !== null ? new Date(tripPoint['date_to']) : tripPoint['date_to'],
      isFavorite: tripPoint['is_favorite']
    };

    delete adaptedTripPoint['base_price'];
    delete adaptedTripPoint['date_from'];
    delete adaptedTripPoint['date_to'];
    delete adaptedTripPoint['is_favorite'];

    return adaptedTripPoint;
  }

  async addTripPoint(updateType, update) {
    try {
      const response = await this.#tripPointsApiService.addTripPoint(update);
      const newTripPoint = this.#adaptToClient(response);

      this.#tripPoints = [newTripPoint, ...this.#tripPoints];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t add task');
    }
  }

  async updateTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting trip point');
    }

    try {
      const response = await this.#tripPointsApiService.updateTripPoint(update);
      const updatedTripPoint = this.#adaptToClient(response);

      this.#tripPoints[index] = updatedTripPoint;

      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async deleteTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting trip point');
    }

    try {
      await this.#tripPointsApiService.deleteTripPoint(update);
      this.#tripPoints = [
        ...this.#tripPoints.slice(0, index),
        ...this.#tripPoints.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete task');
    }
  }
}
