import {render, RenderPosition} from '../render.js';
import NewTripPointView from '../view/add-trip-point-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sort-view.js';
import EditableTripPointView from '../view/edit-trip-point-view.js';

export default class TripEventsListPresenter {
  tripEventsListComponent = new TripEventsListView();
  sortingComponent = new SortingView();

  constructor ({tripEventsListContainer}) {
    this.tripEventsListContainer = tripEventsListContainer;
  }

  init() {
    render(this.tripEventsListComponent, this.tripEventsListContainer, RenderPosition.AFTERBEGIN);
    render(this.sortingComponent, this.tripEventsListComponent.getElement());
    render(new EditableTripPointView(), this.tripEventsListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.tripEventsListComponent.getElement());
    }
    render(new NewTripPointView(), this.tripEventsListComponent.getElement());
  }
}
