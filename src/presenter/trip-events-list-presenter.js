import { render, RenderPosition } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sort-view.js';
import TripEventsListEmptyView from '../view/trip-events-list-empty-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import { updateTripPoint } from '../utils.js';
import { SortType } from '../const.js';
import * as dayjs from 'dayjs';

export default class TripEventsListPresenter {
  #tripEventsListComponent = new TripEventsListView();

  #tripEventsListContainer = null;
  #tripPointsModel = null;
  #tripPoints = [];
  #tripPointPresenters = new Map();

  #sortingComponent = null;
  #currentSortType = SortType.DAY;
  #defaultTripPoints = [];

  constructor({ tripEventsListContainer, tripPointsModel }) {
    this.#tripEventsListContainer = tripEventsListContainer;
    this.#tripPointsModel = tripPointsModel;
  }

  init() {
    this.#tripPoints = [...this.#tripPointsModel.tripPoints].sort((firstPoint, secondPoint) => firstPoint.dateFrom - secondPoint.dateFrom);
    this.#defaultTripPoints = [...this.#tripPointsModel.tripPoints].sort((firstPoint, secondPoint) => firstPoint.dateFrom - secondPoint.dateFrom);
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

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#tripPoints.sort((firstPoint, secondPoint) => {
          const firstPointDuration = dayjs(firstPoint.dateTo).diff(dayjs(firstPoint.dateFrom));
          const secondPointDuration = dayjs(secondPoint.dateTo).diff(dayjs(secondPoint.dateFrom));
          return secondPointDuration - firstPointDuration;
        });
        break;
      case SortType.PRICE:
        this.#tripPoints.sort((firstPoint, secondPoint) => secondPoint.basePrice - firstPoint.basePrice);
        break;
      default:
        this.#tripPoints = [...this.#defaultTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #clearTripEventsList() {
    this.#tripPointPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenters.clear();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearTripEventsList();
    this.#renderTripPointsToList();
  };

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });
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
    this.#defaultTripPoints = updateTripPoint(this.#defaultTripPoints, updatedData);
    this.#tripPointPresenters.get(updatedData.id).init(updatedData);
  };
}

