import { render, RenderPosition } from '../render.js';
import NewTripPointView from '../view/add-trip-point-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sort-view.js';
import EditableTripPointView from '../view/edit-trip-point-view.js';

export default class TripEventsListPresenter {
  tripEventsListComponent = new TripEventsListView();
  sortingComponent = new SortingView();

  constructor({ tripEventsListContainer, tripPointsModel }) {
    this.tripEventsListContainer = tripEventsListContainer;
    this.tripPointsModel = tripPointsModel;
  }

  init() {
    this.tripPoints = [...this.tripPointsModel.getTripPoints()];

    render(this.tripEventsListComponent, this.tripEventsListContainer, RenderPosition.AFTERBEGIN);
    render(this.sortingComponent, this.tripEventsListComponent.getElement());
    render(new EditableTripPointView({ tripPoints: this.tripPoints[0] }), this.tripEventsListComponent.getElement());
    for (let i = 1; i < this.tripPoints.length - 2; i++) {
      render(new TripPointView({ tripPoints: this.tripPoints[i] }), this.tripEventsListComponent.getElement());
    }
    render(new NewTripPointView({ tripPoints: this.tripPoints[this.tripPoints.length - 1] }), this.tripEventsListComponent.getElement());
  }
}
