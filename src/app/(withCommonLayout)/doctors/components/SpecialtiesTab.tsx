'use client';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { SyntheticEvent, useState } from 'react';
import { useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';
import { useRouter, useSearchParams } from 'next/navigation';

const SpecialtiesTab = () => {
    const searchParams = useSearchParams();
    const specialties = searchParams.get('specialties') || '';
    const [value, setValue] = useState(specialties);
    const { data } = useGetAllSpecialtiesQuery({});
    const router = useRouter();

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
        if (newValue) {
            router.push(`/doctors?specialties=${newValue}`);
        } else {
            router.push('/doctors');
        }
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
                    <Tab
                        label="All"
                        value=""
                        sx={{
                            fontWeight: 600,
                        }}
                    />
                    {data?.specialties.map((specialty) => (
                        <Tab
                            key={specialty.id}
                            label={specialty.title}
                            value={specialty.title}
                            sx={{
                                fontWeight: 600,
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
        </Box>
    );
};

export default SpecialtiesTab;
