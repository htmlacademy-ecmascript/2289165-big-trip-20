import AbstractView from '../framework/view/abstract-view.js';

const createBtnAddNewTripPointTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewEventBtnView extends AbstractView {

  #handleNewEventBtnClick = null;

  constructor({ onNewEventBtnClick }) {
    super();

    this.#handleNewEventBtnClick = onNewEventBtnClick;

    this.element.addEventListener('click', this.#newEventBtnClickHandler);
  }

  get template() {
    return createBtnAddNewTripPointTemplate();
  }

  #newEventBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewEventBtnClick();
  };
}

