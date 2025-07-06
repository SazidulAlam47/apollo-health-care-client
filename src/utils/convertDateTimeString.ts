import pad from './pad';

export const convertDateToString = (date: Date) =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const convertTimeToString = (date: Date) =>
    `${pad(date.getHours())}:${pad(date.getMinutes())}`;
