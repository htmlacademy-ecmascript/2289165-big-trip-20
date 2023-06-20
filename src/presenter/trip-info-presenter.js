import {render, remove, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;
  #tripPointsModel = null;
  #tripPoints = [];

  constructor({tripInfoContainer, tripPointsModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripPointsModel = tripPointsModel;

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
  }

  init() {

    if (!this.#tripPointsModel.tripPoints.length) {
      return;
    }

    this.#tripInfoComponent = new TripInfoView({tripPointsModel: this.#tripPointsModel});
    render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    remove(this.#tripInfoComponent);
    this.init();
  };
}
