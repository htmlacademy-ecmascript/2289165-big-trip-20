import { render, replace, remove } from '../framework/render.js';
import TripPointView from '../view/trip-point-view.js';
import EditableTripPointView from '../view/edit-trip-point-view.js';
import { Mode } from '../const.js';

export default class TripPointPresenter {

  #tripEventsListContainer = null;
  #handleTripPointUpdate = null;
  #handleModeChange = null;

  #tripPointComponent = null;
  #editableTripPointComponent = null;

  #tripPoint = null;
  #mode = Mode.DEFAULT;


  constructor({ tripEventsListContainer, onDataChange, onModeChange }) {
    this.#tripEventsListContainer = tripEventsListContainer;
    this.#handleTripPointUpdate = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(tripPoint) {
    this.#tripPoint = tripPoint;

    const prevTripPointComponent = this.#tripPointComponent;
    const prevEditableTripPointComponent = this.#editableTripPointComponent;

    this.#tripPointComponent = new TripPointView({
      tripPoint: this.#tripPoint,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editableTripPointComponent = new EditableTripPointView({
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
      replace(this.#tripPointComponent, prevEditableTripPointComponent);
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

  #handleFavoriteClick = () => {
    this.#handleTripPointUpdate({...this.#tripPoint, isFavorite: !this.#tripPoint.isFavorite});
  };

  #handleFormSubmit = (data) => {
    this.#handleTripPointUpdate(data);
    this.#replaceEditFormToTripPointComponent();
  };

  #handleFormCancel = () => {
    this.#editableTripPointComponent.reset(this.#tripPoint);
    this.#replaceEditFormToTripPointComponent();
  };

  #handleFormDelete = () => {
    remove(this.#editableTripPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
