import { render, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { UpdateType } from '../const.js';
import { filter } from '../utils.js';


export default class FilterPresenter {
  #filterComponent = null;
  #filterContainer = null;
  #tripPointsModel = null;
  #filterModel = null;

  constructor({ filterContainer, tripPointsModel, filterModel }) {
    this.#filterContainer = filterContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#filterModel = filterModel;

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {

    if (!this.#tripPointsModel.offers.length || !this.#tripPointsModel.destinations.length) {
      return;
    }

    const filters = this.filters;
    this.#filterComponent = new FilterView({
      filter: filters,
      onFilterClick: this.#handleFilterClick,
      currentFilter: this.#filterModel.filter
    });
    render(this.#filterComponent, this.#filterContainer);
  }

  get filters() {
    const tripPoints = this.#tripPointsModel.tripPoints;

    return Object.entries(filter).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        isDisabled: !filterPoints(tripPoints).length,
      }),
    );
  }

  #handleModelEvent = () => {
    remove(this.#filterComponent);
    this.init();
  };

  #handleFilterClick = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
