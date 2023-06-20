import TripEventsListPresenter from './presenter/trip-events-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripPointsModel from './model/trip-point-model.js';
import FilterModel from './model/filter-model.js';
import { nanoid } from 'nanoid';
import TripPointsApiService from './trip-points-api-service.js';

const AUTHORIZATION = `Basic ${nanoid()}`;
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const siteHeaderElement = document.querySelector('.trip-main');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');


const tripPointsModel = new TripPointsModel({tripPointsApiService: new TripPointsApiService(END_POINT, AUTHORIZATION)});
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({filterContainer: filterElement, tripPointsModel, filterModel});
const tripInfoPresenter = new TripInfoPresenter({tripInfoContainer: siteHeaderElement, tripPointsModel});
const tripEventsListPresenter = new TripEventsListPresenter({newEventBtn: siteHeaderElement, tripEventsListContainer: tripEventsElement, tripPointsModel, filterModel});

tripInfoPresenter.init();
filterPresenter.init();
tripEventsListPresenter.init();
tripPointsModel.init();
