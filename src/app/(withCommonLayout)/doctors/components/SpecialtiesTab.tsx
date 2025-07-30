'use client';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { SyntheticEvent, useState } from 'react';
import { useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';

const SpecialtiesTab = () => {
    const [value, setValue] = useState('');

    const { data } = useGetAllSpecialtiesQuery({});

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box width="100%">
            <Box
                sx={{
                    width: 'fit-content',
                    maxWidth: '100%',
                    margin: '0 auto',
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {data?.specialties.map((specialty) => (
                        <Tab
                            key={specialty.id}
                            label={specialty.title}
                            value={specialty.title}
                        />
                    ))}
                </Tabs>
            </Box>
        </Box>
    );
};

export default SpecialtiesTab;
