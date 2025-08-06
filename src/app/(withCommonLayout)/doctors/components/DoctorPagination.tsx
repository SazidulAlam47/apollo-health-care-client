'use client';

import { TMeta } from '@/types';
import { Pagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

const DoctorPagination = ({ meta }: { meta: TMeta }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const specialties = searchParams.get('specialties') || '';

    const onChange = (event: ChangeEvent<unknown>, page: number) => {
        router.push(
            `/doctors?page=${page}${specialties ? `&specialties=${specialties}` : ''}`,
        );
        router.refresh();
    };

    return (
        <Pagination
            color="primary"
            count={meta.totalPage}
            page={page}
            onChange={onChange}
            sx={{
                width: 'fit-content',
                mx: 'auto',
            }}
        />
    );
};

export default DoctorPagination;
