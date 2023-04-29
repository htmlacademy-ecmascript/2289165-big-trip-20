// import FilterView from './view/filter-view.js';
// import {RenderPosition, render} from './render.js';
// import SortingView from './view/sort-view.js';
// import NewTripPointView from './view/add-trip-point-view.js';
// import TripInfoView from './view/trip-info-view.js';
// import WaypointView from './view/waypoint-view.js';
// import TripEventsListView from './view/trip-events-list-view.js';

// import EditableTripPointView from './view/edit-trip-point-view.js';

import TripEventsListPresenter from './presenter/trip-events-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';


const siteHeaderElement = document.querySelector('.trip-main');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripInfoPresenter = new TripInfoPresenter({tripInfoContainer: siteHeaderElement});
const filterPresenter = new FilterPresenter({filterContainer: filterElement});
const tripEventsListPresenter = new TripEventsListPresenter({tripEventsListContainer: tripEventsElement});

tripInfoPresenter.init();
filterPresenter.init();
tripEventsListPresenter.init();
