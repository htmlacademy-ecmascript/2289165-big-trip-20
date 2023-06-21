import AbstractView from '../framework/view/abstract-view.js';
import { EmptyListText } from '../const.js';

const cretateTripEventsListEmptyTemplate = (filterType) => `<p class="trip-events__msg">${EmptyListText[filterType]}</p>`;


export default class TripEventsListEmptyView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return cretateTripEventsListEmptyTemplate(this.#filterType);
  }
}
