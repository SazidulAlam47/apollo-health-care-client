import { Stack } from '@mui/material';
import { DotLoader } from 'react-spinners';

const Loader = () => {
    return (
        <Stack height="80dvh" justifyContent="center" alignItems="center">
            <DotLoader
                color="#1586FD"
                loading
                size={90}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </Stack>
    );
};

export default Loader;
