export const convertDateTimeToUTC = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;

    return new Date(date.getTime() + offset);
};

export const convertDateTimeToLocal = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;

    return new Date(date.getTime() - offset);
};
