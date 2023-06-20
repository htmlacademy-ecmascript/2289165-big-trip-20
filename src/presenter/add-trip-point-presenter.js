import { RenderPosition, remove, render } from '../framework/render.js';
import NewTripPointView from '../view/add-trip-point-view.js';
import { UserAction, UpdateType } from '../const.js';
import { nanoid } from 'nanoid';

export default class NewTripPointPresenter {

  #tripPointsListContainer = null;

  #handleDataChange = null;
  #handleTripPointDestroy = null;

  #editableTripPointComponent = null;

  constructor ({tripPointsListContainer, onDataChange, onTripPointDestroy}) {
    this.#tripPointsListContainer = tripPointsListContainer;

    this.#handleDataChange = onDataChange;
    this.#handleTripPointDestroy = onTripPointDestroy;
  }

  init () {
    this.#editableTripPointComponent = new NewTripPointView ({
      onFormSubmit: this.#handleFormSubmit,
      onFormCancel: this.#handleFormCancel,
    });

    render (this.#editableTripPointComponent, this.#tripPointsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy () {
    if (this.#editableTripPointComponent === null) {
      return;
    }

    this.#handleTripPointDestroy();
    remove(this.#editableTripPointComponent);
    this.#editableTripPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (tripPoint) => {
    this.#handleDataChange(
      UserAction.ADD_TRIP_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...tripPoint},
    );
    this.destroy();
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
