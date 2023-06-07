import { render, RenderPosition } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sort-view.js';
import TripEventsListEmptyView from '../view/trip-events-list-empty-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import { updateTripPoint } from '../utils.js';

export default class TripEventsListPresenter {
  #tripEventsListComponent = new TripEventsListView();
  #sortingComponent = new SortingView();

  #tripEventsListContainer = null;
  #tripPointsModel = null;
  #tripPoints = [];
  #tripPointPresenters = new Map();

  constructor({ tripEventsListContainer, tripPointsModel }) {
    this.#tripEventsListContainer = tripEventsListContainer;
    this.#tripPointsModel = tripPointsModel;
  }

  init() {
    this.#tripPoints = [...this.#tripPointsModel.tripPoints];
    this.#renderTripEventsList();
  }

  #renderTripEventsList() {
    if (!this.#tripPoints.length) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSorting();
    this.#renderTripPointsToList();
  }

  #renderEmptyList() {
    render(new TripEventsListEmptyView(), this.#tripEventsListContainer);
  }

  #renderSorting() {
    render(this.#sortingComponent, this.#tripEventsListComponent.element);
  }

  #renderTripPointsToList() {
    render(this.#tripEventsListComponent, this.#tripEventsListContainer, RenderPosition.AFTERBEGIN);
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
  }

  #renderTripPoint(tripPoint) {
    const tripPointPresenter = new TripPointPresenter({
      tripEventsListContainer: this.#tripEventsListComponent.element,
      onDataChange: this.#handleTripPointChange,
      onModeChange: this.#handleModeChange
    });
    tripPointPresenter.init(tripPoint);
    this.#tripPointPresenters.set(tripPoint.id, tripPointPresenter);
  }

  #handleModeChange = () => {
    this.#tripPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleTripPointChange = (updatedData) => {
    this.#tripPoints = updateTripPoint(this.#tripPoints, updatedData);
    this.#tripPointPresenters.get(updatedData.id).init(updatedData);
  };
}

