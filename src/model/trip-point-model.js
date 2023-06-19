import { getTripPoint } from '../mock/trip-point.js';
import { TRIP_POINTS_COUNT } from '../const';
import Observable from '../framework/observable.js';

export default class TripPointsModel extends Observable{
  #tripPoints = Array.from({ length: TRIP_POINTS_COUNT }, getTripPoint);

  get tripPoints() {
    return this.#tripPoints;
  }

  updateTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting trip point');
    }

    this.#tripPoints = [
      ...this.#tripPoints.slice(0, index),
      update,
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  }


  addTripPoint(updateType, update) {
    this.#tripPoints = [
      update,
      ...this.#tripPoints,
    ];

    this._notify(updateType, update);
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
