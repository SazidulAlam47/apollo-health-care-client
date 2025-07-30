import { Box } from '@mui/material';

const DashedLine = () => {
    return (
        <Box
            sx={{
                borderBottom: '1px dashed #ddd',
                marginBottom: { xs: 1, md: 0 },
            }}
        />
    );
};

export default DashedLine;
