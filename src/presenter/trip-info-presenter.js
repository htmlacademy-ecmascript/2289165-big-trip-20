import {render, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #tripPointsModel = null;
  #tripPoints = [];

  constructor({tripInfoContainer, tripPointsModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripPointsModel = tripPointsModel;
  }

  init() {
    this.#tripPoints = [...this.#tripPointsModel.tripPoints];

    if (!this.#tripPoints.length) {
      return;
    }

    render(new TripInfoView({tripPoints: this.#tripPoints}), this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }
}
