import {render} from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterComponent = new FilterView();
  #filterContainer = null;

  constructor({filterContainer: filterContainer}) {
    this.#filterContainer = filterContainer;
  }

  init() {
    render(this.#filterComponent, this.#filterContainer);
  }
}
