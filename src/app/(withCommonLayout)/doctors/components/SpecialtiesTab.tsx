'use client';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { SyntheticEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TSpecialty } from '@/types';

const SpecialtiesTab = ({ specialties }: { specialties: TSpecialty[] }) => {
    const searchParams = useSearchParams();
    const activeSpecialty = searchParams.get('specialties') || '';

    const router = useRouter();

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        if (newValue) {
            router.push(`/doctors?specialties=${newValue}`);
            router.refresh();
        } else {
            router.push('/doctors');
            router.refresh();
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
                    value={activeSpecialty}
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
                    {specialties.map((specialty) => (
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
