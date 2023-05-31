import { getTripPoint } from '../mock/trip-point.js';
import { TRIP_POINTS_COUNT } from '../const';

export default class TripPointsModel {
  #tripPoints = Array.from({ length: TRIP_POINTS_COUNT }, getTripPoint);

  get tripPoints() {
    return this.#tripPoints;
  }
}
