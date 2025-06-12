export const setToLocalStorage = (key: string, value: string) => {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.setItem(key, value);
};
