'use client';

import HFrom, { TUFromFncRef } from '@/components/Forms/HFrom';
import HInput from '@/components/Forms/HInput';
import { contactFormSchema } from '@/schemas/contact.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid } from '@mui/material';
import { useRef } from 'react';
import { toast } from 'sonner';

const ContactForm = () => {
    const resetRef = useRef<TUFromFncRef>(null);

    const onSubmit = () => {
        toast.success('Query Submitted successfully');
        resetRef.current?.resetFrom();
    };

    return (
        <HFrom
            onSubmit={onSubmit}
            resolver={zodResolver(contactFormSchema)}
            fncRef={resetRef}
        >
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <HInput label="Name" name="name" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <HInput label="Email" name="email" />
                </Grid>

                <Grid size={12}>
                    <HInput label="What is your concern?" name="concern" />
                </Grid>
                <Grid size={12}>
                    <HInput
                        label="Your query"
                        name="query"
                        multiline
                        minRows={3}
                    />
                </Grid>

                <Grid size={12}>
                    <Button type="submit" fullWidth>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </HFrom>
    );
};

export default ContactForm;
