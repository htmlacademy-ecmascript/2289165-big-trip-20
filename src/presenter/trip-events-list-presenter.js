import { render, RenderPosition, replace, remove } from '../framework/render.js';
import TripPointView from '../view/trip-point-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sort-view.js';
import EditableTripPointView from '../view/edit-trip-point-view.js';
import TripEventsListEmptyView from '../view/trip-events-list-empty-view.js';

export default class TripEventsListPresenter {
  #tripEventsListComponent = new TripEventsListView();
  #sortingComponent = new SortingView();

  #tripEventsListContainer = null;
  #tripPointsModel = null;
  #tripPoints = [];

  constructor({ tripEventsListContainer, tripPointsModel }) {
    this.#tripEventsListContainer = tripEventsListContainer;
    this.#tripPointsModel = tripPointsModel;
  }

  init() {
    this.#tripPoints = [...this.#tripPointsModel.tripPoints];

    render(this.#tripEventsListComponent, this.#tripEventsListContainer, RenderPosition.AFTERBEGIN);

    if (!this.#tripPoints.length) {
      render(new TripEventsListEmptyView(), this.#tripEventsListContainer);
      return;
    }

    render(this.#sortingComponent, this.#tripEventsListComponent.element);
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
  }

  #renderTripPoint(tripPoint) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToTripComponent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripComponent = new TripPointView({
      tripPoint,
      onEditClick: () => {
        replaceTripComponentToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onFavoriteClick: () => {
      }
    });
    const editableTripComponent = new EditableTripPointView({
      tripPoint,
      onFormSubmit: () => {
        replaceEditFormToTripComponent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormCancel: () => {
        replaceEditFormToTripComponent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormDelete: () => {
        remove(editableTripComponent);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceTripComponentToEditForm() {
      replace(editableTripComponent, tripComponent);
    }

    function replaceEditFormToTripComponent() {
      replace(tripComponent, editableTripComponent);
    }


    render(tripComponent, this.#tripEventsListComponent.element);
  }
}

