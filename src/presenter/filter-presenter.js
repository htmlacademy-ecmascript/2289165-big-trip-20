import {render} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { filter } from '../main.js';


export default class FilterPresenter {
  #filterComponent = new FilterView({filter});
  #filterContainer = null;

  constructor({filterContainer: filterContainer}) {
    this.#filterContainer = filterContainer;
  }

  init() {
    render(this.#filterComponent, this.#filterContainer);
  }
}
