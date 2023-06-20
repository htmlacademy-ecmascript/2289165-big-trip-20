import { render, replace, remove } from '../framework/render.js';
import TripPointView from '../view/trip-point-view.js';
import EditableTripPointView from '../view/edit-trip-point-view.js';
import { Mode, UserAction, UpdateType } from '../const.js';

export default class TripPointPresenter {

  #tripPointsModel = null;
  #tripEventsListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #tripPointComponent = null;
  #editableTripPointComponent = null;

  #tripPoint = null;
  #mode = Mode.DEFAULT;


  constructor({ tripPointsModel, tripEventsListContainer, onDataChange, onModeChange }) {
    this.#tripPointsModel = tripPointsModel;
    this.#tripEventsListContainer = tripEventsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(tripPoint) {
    this.#tripPoint = tripPoint;

    const prevTripPointComponent = this.#tripPointComponent;
    const prevEditableTripPointComponent = this.#editableTripPointComponent;

    this.#tripPointComponent = new TripPointView({
      tripPointsModel: this.#tripPointsModel,
      tripPoint: this.#tripPoint,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavouriteClick,
    });

    this.#editableTripPointComponent = new EditableTripPointView({
      tripPointsModel: this.#tripPointsModel,
      tripPoint: this.#tripPoint,
      onFormSubmit: this.#handleFormSubmit,
      onFormCancel: this.#handleFormCancel,
      onFormDelete: this.#handleFormDelete
    });

    if (prevTripPointComponent === null || prevEditableTripPointComponent === null) {
      render(this.#tripPointComponent, this.#tripEventsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editableTripPointComponent, prevEditableTripPointComponent);
    }

    remove(prevTripPointComponent);
    remove(prevEditableTripPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editableTripPointComponent.reset(this.#tripPoint);
      this.#replaceEditFormToTripPointComponent();
    }
  }

  destroy() {
    remove(this.#tripPointComponent);
    remove(this.#editableTripPointComponent);
  }

  #replaceTripPointComponentToEditForm() {
    replace(this.#editableTripPointComponent, this.#tripPointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToTripPointComponent() {
    replace(this.#tripPointComponent, this.#editableTripPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editableTripPointComponent.reset(this.#tripPoint);
      this.#replaceEditFormToTripPointComponent();
    }
  };

  #handleEditClick = () => {
    this.#replaceTripPointComponentToEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavouriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_TRIP_POINT,
      UpdateType.PATCH,
      {...this.#tripPoint, isFavorite: !this.#tripPoint.isFavorite}
    );
  };

  #handleFormSubmit = (data) => {
    this.#handleDataChange(
      UserAction.UPDATE_TRIP_POINT,
      UpdateType.MINOR,
      data
    );
    this.#replaceEditFormToTripPointComponent();
  };

  #handleFormCancel = () => {
    this.#editableTripPointComponent.reset(this.#tripPoint);
    this.#replaceEditFormToTripPointComponent();
  };

  #handleFormDelete = (data) => {
    this.#handleDataChange(
      UserAction.DELETE_TRIP_POINT,
      UpdateType.MINOR,
      data
    );
    remove(this.#editableTripPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
