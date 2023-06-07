import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, isChecked) {
  const { filterType, isDisabled } = filter;

  return (
    `
    <div class="trip-filters__filter">
    <input
    id="filter-${filterType}"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
     name="trip-filter"
     value="${filterType}"
      ${isChecked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
    />
    <label
    class="trip-filters__filter-label"
    for="filter-${filterType}">${filterType}
    </label>
    </div>`
  );
}

function createFilterTemplate(filterItems) {

  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
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

  constructor({filter}) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }
}
