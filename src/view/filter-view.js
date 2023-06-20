import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilter) {
  const { type, isDisabled } = filter;

  return (
    `
      <div class="trip-filters__filter">
      <input
      id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
       name="trip-filter"
       value="${type}"
       ${(type) === currentFilter ? 'checked' : ''}
       ${isDisabled ? 'disabled' : ''}
      />
      <label
      class="trip-filters__filter-label"
      for="filter-${type}">${type}
      </label>
      </div>`
  );
}

function createFilterTemplate(filterItems, currentFilter) {

  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilter))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #filter = null;
  #onFilterClick = null;
  #currentFilter = null;

  constructor({filter, onFilterClick, currentFilter}) {
    super();
    this.#filter = filter;
    this.#onFilterClick = onFilterClick;
    this.#currentFilter = currentFilter;
    this.element.addEventListener('click', this.#filterClickHandler);
  }

  get template() {
    return createFilterTemplate(this.#filter, this.#currentFilter);
  }

  #filterClickHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      evt.preventDefault();
      this.#onFilterClick(evt.target.value);
    }
  };
}
