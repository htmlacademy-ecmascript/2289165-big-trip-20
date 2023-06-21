import { render, remove, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;
  #tripPointsModel = null;

  constructor({ tripInfoContainer, tripPointsModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripPointsModel = tripPointsModel;

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const tripPoints = this.#tripPointsModel.tripPoints;
    const destinations = this.#tripPointsModel.destinations;
    const offers = this.#tripPointsModel.offers;

    if (!tripPoints.length || !destinations.length || !offers.length) {
      return;
    }

    this.#tripInfoComponent = new TripInfoView({ tripPoints, destinations, offers });
    render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    remove(this.#tripInfoComponent);
    this.init();
  };
}
