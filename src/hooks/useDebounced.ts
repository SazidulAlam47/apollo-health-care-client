import { useEffect, useState } from 'react';

type TDebouncedProps = {
    searchQuery: string;
    delay: number;
};

const useDebounced = ({ searchQuery, delay }: TDebouncedProps) => {
    const [debouncedValue, setDebouncedValue] = useState(searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchQuery);
        }, delay);

        return () => clearTimeout(handler);
    }, [searchQuery, delay]);

    return debouncedValue;
};

export default useDebounced;
