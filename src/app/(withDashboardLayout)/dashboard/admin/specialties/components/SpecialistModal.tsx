'use client';
import HFrom from '@/components/Forms/HFrom';
import HImageUpload from '@/components/Forms/HImageUpload';
import HInput from '@/components/Forms/HInput';
import HModal from '@/components/shared/HModal/HModal';
import { useCreateSpecialtiesMutation } from '@/redux/api/specialtiesApi';
import { createSpecialistSchema } from '@/schemas/specialties.schema';
import createFormData from '@/utils/createFormData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

const SpecialistModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createSpecialties] = useCreateSpecialtiesMutation();

    const handleCreateSpecialist = async (data: FieldValues) => {
        const formData = createFormData(data);
        const toastId = toast.loading('Creating...');
        try {
            const res = await createSpecialties(formData).unwrap();
            if (res.id) {
                toast.success('Specialist created successfully', {
                    id: toastId,
                });
                setIsModalOpen(false);
            }
        } catch (error: any) {
            toast.error(error.data, { id: toastId });
        }
    };

    return (
        <>
            <Button onClick={() => setIsModalOpen(true)}>
                Create Specialist
            </Button>
            <HModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Create a new Specialist"
            >
                <HFrom
                    onSubmit={handleCreateSpecialist}
                    resolver={zodResolver(createSpecialistSchema)}
                >
                    <Stack direction="column" gap={2} margin={1}>
                        <HInput
                            name="title"
                            label="Specialist Name"
                            size="small"
                        />
                        <HImageUpload title="Specialist Icon" />
                        <Button type="submit" sx={{ mt: 1, padding: '7px' }}>
                            Create
                        </Button>
                    </Stack>
                </HFrom>
            </HModal>
        </>
    );
};

export default SpecialistModal;
