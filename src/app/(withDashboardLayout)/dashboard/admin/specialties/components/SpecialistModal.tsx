'use client';
import HFrom from '@/components/Forms/HFrom';
import HImageUpload from '@/components/Forms/HImageUpload';
import HInput from '@/components/Forms/HInput';
import HModal from '@/components/shared/HModal/HModal';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

const SpecialistModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateSpecialist = (values: FieldValues) => {
        console.log(values);
    };

    return (
        <>
            <Button variant="contained" onClick={() => setIsModalOpen(true)}>
                Create Specialist
            </Button>
            <HModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Create a new Specialist"
            >
                <HFrom onSubmit={handleCreateSpecialist}>
                    <Stack direction="column" gap={2} margin={1}>
                        <HInput
                            name="title"
                            label="Specialist Name"
                            size="small"
                        />
                        <HImageUpload title="Specialist Icon" />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 1 }}
                        >
                            Create
                        </Button>
                    </Stack>
                </HFrom>
            </HModal>
        </>
    );
};

export default SpecialistModal;
