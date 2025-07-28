import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatDateUTC = (date: Date) => {
    return dayjs(date).format('DD/MM/YYYY');
};

export const formatTimeUTC = (date: Date) => {
    return dayjs.utc(date).format('hh:mm a');
};
