'use client';

import { TMeta } from '@/types';
import { Pagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';

const DoctorPagination = ({ meta }: { meta: TMeta }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const page = Number(searchParams.get('page')) || 1;
    const specialties = searchParams.get('specialties') || '';

    const onChange = (event: ChangeEvent<unknown>, page: number) => {
        startTransition(() => {
            router.push(
                `/doctors?page=${page}${specialties ? `&specialties=${specialties}` : ''}`,
            );
            router.refresh();
        });
    };

    return (
        <Pagination
            color="primary"
            count={meta.totalPage}
            page={page}
            onChange={onChange}
            disabled={isPending}
            sx={{
                width: 'fit-content',
                mx: 'auto',
                opacity: isPending ? 0.6 : 1,
                transition: '0.2s',
            }}
        />
    );
};

export default DoctorPagination;
