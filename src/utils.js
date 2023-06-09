import { DATE_FORMAT, TIME_FORMAT, FilterType } from './const';
import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const humanizeDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';
const humanizeTime = (time) => time ? dayjs(time).format(TIME_FORMAT) : '';


const getEventLasting = (dateFrom, dateTo) => {
  const diff = dayjs.duration(dayjs(dateTo) - dayjs(dateFrom));

  let eventLasting = '';

  if (diff.days() > 0) {
    eventLasting += `${diff.days()}D `;
  }
  if (diff.days() > 0 || diff.hours() > 0) {
    eventLasting += `${diff.hours()}H`;
  }
  if (diff.days() > 0 || diff.hours() > 0 || diff.minutes() > 0) {
    eventLasting += ` ${diff.minutes()}M`;
  }

  return eventLasting;
};

const getDestinationById = (id, destinations) => destinations.find((element) => element.id === id);
const getOffersByType = (type, offers) => offers.find((offer) => offer.type === type);

const getOfferById = (id, offers) => {
  let offerById;
  offers.forEach((element) => {
    element.offers.forEach((offer) => {
      if (offer.id === id) {
        offerById = offer;
      }
    });
  });
  return offerById;
};

const isTripPointFuture = (dateFrom) => dateFrom && dayjs().isBefore(dateFrom, 'D');

const isTripPointPresent = (dateFrom, dateTo) => {
  const isDateFromSameDateOrBefore = dayjs().isSameOrAfter(dayjs(dateFrom), 'D');
  const isDateToSameDateOrAfter = dayjs().isSameOrBefore(dayjs(dateTo), 'day');

  return isDateFromSameDateOrBefore && isDateToSameDateOrAfter;
};

const isTripPointPast = (dateTo) => dateTo && dayjs().isAfter(dateTo, 'D');

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => [...tripPoints],
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tropPoint) => isTripPointFuture(tropPoint.dateFrom)),
  [FilterType.PRESENT]: (tripPoints) => tripPoints.filter((tripPoint) => isTripPointPresent(tripPoint.dateFrom, tripPoint.dateTo)),
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => isTripPointPast(tripPoint.dateTo)),
};

export { humanizeDate, humanizeTime, getEventLasting, filter, getDestinationById, getOfferById, getOffersByType };
