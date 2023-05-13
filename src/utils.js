import { DATE_FORMAT, TIME_FORMAT } from './const';
import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

function getRandomInteger(min, max) {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
}

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

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

export { getRandomInteger, getRandomArrayElement, createIdGenerator, humanizeDate, humanizeTime, getEventLasting };
