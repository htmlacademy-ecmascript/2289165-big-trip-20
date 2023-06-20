import Observable from '../framework/observable.js';
import { UpdateType } from '../const';

export default class TripPointsModel extends Observable{
  #tripPointsApiService = null;

  #tripPoints = [];
  #destinations = [];
  #offers = [];

  constructor ({tripPointsApiService}) {
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

  async init () {
    try {
      const tripPoints = await this.#tripPointsApiService.tripPoints;
      const destinations = await this.#tripPointsApiService.destinations;
      const offers = await this.#tripPointsApiService.offers;
      this.#tripPoints = tripPoints.map(this.#adaptToClient);
      this.#destinations = destinations;
      this.#offers = offers;
    } catch (err) {
      this.#tripPoints = [];
      this.#destinations = [];
      this.#offers = [];
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

  getDestinationById = (id) => this.#destinations.find((element) => element.id === id);

  getOfferById = (id) => {
    let offerById;
    this.#offers.forEach((element) => {
      element.offers.forEach((offer) => {
        if (offer.id === id) {
          offerById = offer;
        }
      });
    });
    return offerById;
  };

  getOffersByType = (type) => {
    let offersByType = [];
    this.#offers.forEach((offer) => {
      if (offer.type === type) {
        offersByType = offer.offers;
      }
    });
    return offersByType;
  };

  getCheckedOffers = (offers) => {
    const offersList = [];
    offers.forEach((id) => {
      offersList.push(this.getOfferById(id));
    });
    return offersList;
  };


  // getCities = () => this.#destinations.map((destination) => destination.name);
  // getEvents = () => this.#offers.map((offer) => offer.type);


  addTripPoint(updateType, update) {
    this.#tripPoints = [
      update,
      ...this.#tripPoints,
    ];

    this._notify(updateType, update);
  }

  async updateTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting trip point');
    }

    try {
      const respose = await this.#tripPointsApiService.updateTripPoint(update);
      const updatedTripPoint = this.#adaptToClient(respose);

      this.#tripPoints[index] = updatedTripPoint;

      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  deleteTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting trip point');
    }

    this.#tripPoints = [
      ...this.#tripPoints.slice(0, index),
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
