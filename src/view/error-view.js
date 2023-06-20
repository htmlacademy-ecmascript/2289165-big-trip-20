import AbstractView from '../framework/view/abstract-view.js';

function createErrorTemplate (error) {
  return `<p class="trip-events__msg">Error ${error ? error.message : ''}</p>`;
}

export default class ErrorView extends AbstractView {
  #error = null;

  constructor (error) {
    super();
    this.#error = error;
  }

  get template () {
    return createErrorTemplate(this.#error);
  }
}
