import {render, RenderPosition} from '../render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {

  constructor({tripInfoContainer, tripPointsModel}) {
    this.tripInfoContainer = tripInfoContainer;
    this.tripPointsModel = tripPointsModel;
  }

  init() {
    this.tripPoints = [...this.tripPointsModel.getTripPoints()];

    render(new TripInfoView({tripPoints: this.tripPoints}), this.tripInfoContainer, RenderPosition.AFTERBEGIN);
  }
}
