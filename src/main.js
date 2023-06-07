import TripEventsListPresenter from './presenter/trip-events-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripPointsModel from './model/trip-point-model.js';
import { generateFilter } from './mock/filter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');


const tripPointsModel = new TripPointsModel();

const filter = generateFilter(tripPointsModel.tripPoints);

const filterPresenter = new FilterPresenter({filterContainer: filterElement, filter});
const tripInfoPresenter = new TripInfoPresenter({tripInfoContainer: siteHeaderElement, tripPointsModel});
const tripEventsListPresenter = new TripEventsListPresenter({tripEventsListContainer: tripEventsElement, tripPointsModel});

tripInfoPresenter.init();
filterPresenter.init();
tripEventsListPresenter.init();

export {filter};

