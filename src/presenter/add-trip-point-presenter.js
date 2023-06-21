import { RenderPosition, remove, render } from '../framework/render.js';
import NewTripPointView from '../view/add-trip-point-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewTripPointPresenter {

  #tripPointsModel = null;
  #tripPointsListContainer = null;

  #handleDataChange = null;
  #handleTripPointDestroy = null;

  #newTripPointComponent = null;

  constructor({ tripPointsModel, tripPointsListContainer, onDataChange, onTripPointDestroy }) {
    this.#tripPointsModel = tripPointsModel;
    this.#tripPointsListContainer = tripPointsListContainer;

    this.#handleDataChange = onDataChange;
    this.#handleTripPointDestroy = onTripPointDestroy;
  }

  init() {
    this.#newTripPointComponent = new NewTripPointView({
      destinations: this.#tripPointsModel.destinations,
      offers: this.#tripPointsModel.offers,
      events: this.#tripPointsModel.getEvents(),
      cities: this.#tripPointsModel.getCities(),
      onFormSubmit: this.#handleFormSubmit,
      onFormCancel: this.#handleFormCancel,
    });

    render(this.#newTripPointComponent, this.#tripPointsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newTripPointComponent === null) {
      return;
    }

    this.#handleTripPointDestroy();
    remove(this.#newTripPointComponent);
    this.#newTripPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#newTripPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newTripPointComponent.updateElement({
        isDisabled: false,
        isSaving: false
      });
    };

    this.#newTripPointComponent.shake(resetFormState);
  }

  #handleFormSubmit = (tripPoint) => {
    this.#handleDataChange(
      UserAction.ADD_TRIP_POINT,
      UpdateType.MINOR,
      tripPoint,
    );
  };

  #handleFormCancel = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
