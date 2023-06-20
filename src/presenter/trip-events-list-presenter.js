import { render, remove, RenderPosition } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sort-view.js';
import TripEventsListEmptyView from '../view/trip-events-list-empty-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import * as dayjs from 'dayjs';
import { filter } from '../utils.js';
import NewTripPointPresenter from './add-trip-point-presenter.js';
import NewEventBtnView from '../view/btn-new-event-view.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ErrorView from '../view/error-view.js';
import { TimeLimitForUiBlocker } from '../const.js';


export default class TripEventsListPresenter {
  #tripEventsListComponent = new TripEventsListView();
  #loadingComponent = new LoadingView();

  #tripEventsListContainer = null;
  #tripPointsModel = null;
  #filterModel = null;
  #filterType = null;
  #tripPointPresenters = new Map();
  #newTripPointPresenter = null;
  #newEventBtn = null;
  #error = null;

  #isNewTripPoint = false;
  #isLoading = true;

  #sortingComponent = null;
  #currentSortType = SortType.DAY;
  #emptyListComponent = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimitForUiBlocker.LOWER_LIMIT,
    upperLimit: TimeLimitForUiBlocker.UPPER_LIMIT
  });

  constructor({ newEventBtn, tripEventsListContainer, tripPointsModel, filterModel }) {
    this.#tripEventsListContainer = tripEventsListContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#filterModel = filterModel;

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newEventBtn = new NewEventBtnView({
      onNewEventBtnClick: this.#onNewEventBtnClick
    });

    render(this.#newEventBtn, newEventBtn);

    this.#newTripPointPresenter = new NewTripPointPresenter({
      tripPointsModel: this.#tripPointsModel,
      tripPointsListContainer: this.#tripEventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onTripPointDestroy: this.#handleNewTripPointFormClose,
    });
  }

  init() {
    this.#renderTripEventsList();
  }

  get tripPoints() {
    this.#filterType = this.#filterModel.filter;
    const tripPoints = this.#tripPointsModel.tripPoints;
    const filteredPoints = filter[this.#filterType](tripPoints);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort((firstPoint, secondPoint) => firstPoint.dateFrom - secondPoint.dateFrom);
      case SortType.TIME:
        return filteredPoints.sort((firstPoint, secondPoint) => {
          const firstPointDuration = dayjs(firstPoint.dateTo).diff(dayjs(firstPoint.dateFrom));
          const secondPointDuration = dayjs(secondPoint.dateTo).diff(dayjs(secondPoint.dateFrom));
          return secondPointDuration - firstPointDuration;
        });
      case SortType.PRICE:
        return filteredPoints.sort((firstPoint, secondPoint) => secondPoint.basePrice - firstPoint.basePrice);
    }

    return filteredPoints;
  }

  #renderTripEventsList() {
    if (this.#isLoading) {
      this.#newEventBtn.element.disabled = true;
      this.#renderLoading();
      return;
    }

    this.#newEventBtn.element.disabled = false;

    if(!this.#tripPointsModel.offers.length || !this.#tripPointsModel.destinations.length) {
      this.#newEventBtn.element.disabled = true;
      this.#renderError();
      return;
    }

    if (!this.tripPoints.length && !this.#isNewTripPoint) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSorting();
    this.#renderTripPointsToList();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripEventsListContainer);
  }

  #renderEmptyList() {
    this.#emptyListComponent = new TripEventsListEmptyView({ filterType: this.#filterType });
    render(this.#emptyListComponent, this.#tripEventsListContainer);
  }

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortingComponent, this.#tripEventsListComponent.element);
  }

  #renderTripPointsToList() {
    render(this.#tripEventsListComponent, this.#tripEventsListContainer, RenderPosition.AFTERBEGIN);
    this.tripPoints.forEach((point) => this.#renderTripPoint(point));
  }

  #renderTripPoint(tripPoint) {
    const tripPointPresenter = new TripPointPresenter({
      tripPointsModel: this.#tripPointsModel,
      tripEventsListContainer: this.#tripEventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    tripPointPresenter.init(tripPoint);
    this.#tripPointPresenters.set(tripPoint.id, tripPointPresenter);
  }

  #renderError(error) {
    this.#error = new ErrorView(error);
    render(this.#error, this.#tripEventsListContainer);
  }

  #createNewTripPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newTripPointPresenter.init();
  }

  #clearTripEventsList({ resetSortType = false } = {}) {
    this.#newTripPointPresenter.destroy();
    this.#tripPointPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenters.clear();

    remove(this.#sortingComponent);
    remove(this.#emptyListComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripEventsList();

    this.#renderTripEventsList();
  };

  #handleModeChange = () => {
    this.#newTripPointPresenter.destroy();
    this.#tripPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripEventsList();
        this.#renderTripEventsList();
        break;
      case UpdateType.MAJOR:
        this.#clearTripEventsList({ resetSortType: true });
        this.#renderTripEventsList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#newEventBtn.element.disabled = true;
        remove(this.#loadingComponent);
        this.#renderTripEventsList();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        this.#newEventBtn.element.disabled = true;
        remove(this.#loadingComponent);
        this.#renderError(data);
        break;
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_TRIP_POINT:
        this.#tripPointPresenters.get(update.id).setSaving();
        try {
          await this.#tripPointsModel.updateTripPoint(updateType, update);
        } catch (err) {
          this.#tripPointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_TRIP_POINT:
        this.#newTripPointPresenter.setSaving();
        try {
          await this.#tripPointsModel.addTripPoint(updateType, update);
        } catch (err) {
          this.#newTripPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TRIP_POINT:
        this.#tripPointPresenters.get(update.id).setDeleting();
        try {
          await this.#tripPointsModel.deleteTripPoint(updateType, update);
        } catch (err) {
          this.#tripPointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #onNewEventBtnClick = () => {
    this.#isNewTripPoint = true;
    this.#newEventBtn.element.disabled = true;
    this.#createNewTripPoint();
  };

  #handleNewTripPointFormClose = () => {
    this.#isNewTripPoint = false;
    this.#newEventBtn.element.disabled = false;
    if (!this.tripPoints.length && !this.#isNewTripPoint) {
      remove(this.#sortingComponent);
      this.#renderEmptyList();
    }
  };
}
