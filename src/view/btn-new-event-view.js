import AbstractView from '../framework/view/abstract-view.js';

function createBtnAddNewTripPointTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewEventBtnView extends AbstractView {

  #handleNewEventBtnClick = null;

  constructor({ onNewEventBtnClick }) {
    super();

    this.#handleNewEventBtnClick = onNewEventBtnClick;

    this.element.addEventListener('click', this.#onNewEventBtnClick);
  }

  get template() {
    return createBtnAddNewTripPointTemplate();
  }

  #onNewEventBtnClick = (evt) => {
    evt.preventDefault();
    this.#handleNewEventBtnClick();
  };
}

