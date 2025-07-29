'use client';
import HFrom from '@/components/Forms/HFrom';
import HImageUpload from '@/components/Forms/HImageUpload';
import HInput from '@/components/Forms/HInput';
import HMultipleSelect from '@/components/Forms/HMultipleSelect';
import HSelect from '@/components/Forms/HSelect';
import Loader from '@/components/shared/Loader/Loader';
import { GenderSelect } from '@/constants/user.constant';
import { useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';
import {
    useGetSingleUserQuery,
    useUpdateProfileMutation,
} from '@/redux/api/userApi';
import {
    updateAdminProfileSchema,
    updateDoctorProfileSchema,
    updatePatientProfileSchema,
} from '@/schemas/user.schema';
import createFormData from '@/utils/createFormData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { AnyZodObject } from 'zod';

const EditProfilePage = () => {
    const { data: user, isLoading: isUserLoading } = useGetSingleUserQuery({});
    const { data: specialtiesData, isLoading: isSpecialtiesLoading } =
        useGetAllSpecialtiesQuery({}, { skip: user?.role !== 'DOCTOR' });
    const [updateProfile] = useUpdateProfileMutation();
    const router = useRouter();

    if (isUserLoading || !user) {
        return <Loader />;
    }

    const defaultValues = {
        name: user?.name || undefined,
        email: user?.email || undefined,
        contactNumber: user?.contactNumber || undefined,
        address: user?.address || undefined,
        currentWorkingPlace: user?.currentWorkingPlace || undefined,
        gender: user?.gender || undefined,
        experience: user?.experience ? user.experience.toString() : undefined,
        appointmentFee: user?.appointmentFee
            ? user.appointmentFee.toString()
            : undefined,
        registrationNumber: user?.registrationNumber || undefined,
        qualification: user?.qualification || undefined,
        designation: user?.designation || undefined,
        specialties: user?.doctorSpecialties?.length
            ? user.doctorSpecialties.map(
                  (specialty) => specialty.specialties.id,
              )
            : [],
    };

    const handleUpdate = async (data: FieldValues) => {
        if (user?.role === 'DOCTOR') {
            const specialtiesToDelete = defaultValues?.specialties.filter(
                (specialtyId: string) =>
                    !data.specialties.includes(specialtyId),
            );

            const specialtiesPayload = [
                ...specialtiesToDelete.map((specialtyId: string) => ({
                    specialtiesId: specialtyId,
                    isDeleted: true,
                })),
                ...data?.specialties.map((specialtyId: string) => ({
                    specialtiesId: specialtyId,
                    isDeleted: false,
                })),
            ];

            data.specialties = specialtiesPayload;
        }

        const formData = createFormData(data);

        const toastId = toast.loading('Updating...');
        try {
            const res = await updateProfile(formData).unwrap();
            if (res.id) {
                toast.success('Profile updated successfully', {
                    id: toastId,
                });
                router.push('/dashboard/profile');
            } else {
                toast.error('Something went wrong', {
                    id: toastId,
                });
            }
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    let updateProfileSchema: AnyZodObject;

    switch (user.role) {
        case 'ADMIN':
            updateProfileSchema = updateAdminProfileSchema;
            break;
        case 'PATIENT':
            updateProfileSchema = updatePatientProfileSchema;
            break;
        case 'DOCTOR':
            updateProfileSchema = updateDoctorProfileSchema;
            break;
        default:
            throw new Error('Unknown user role');
    }

    const specialtiesOptions = specialtiesData?.specialties.length
        ? specialtiesData?.specialties.map((specialty) => ({
              value: specialty.id,
              label: specialty.title,
          }))
        : [];

    return (
        <Box>
            <Typography variant="h5" component="h5" mb={3}>
                Update Your Profile
            </Typography>
            <HFrom
                onSubmit={handleUpdate}
                defaultValues={defaultValues}
                resolver={zodResolver(updateProfileSchema)}
            >
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <HInput name="name" label="Name" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <HInput name="email" label="Email" disabled />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <HInput name="contactNumber" label="Contact Number" />
                    </Grid>
                    <Grid size={12} order={13}>
                        <HImageUpload title="Profile Photo" />
                    </Grid>
                    {user?.role === 'PATIENT' && (
                        <Grid size={{ xs: 12, md: 6 }}>
                            <HInput name="address" label="Address" />
                        </Grid>
                    )}
                    {user?.role === 'DOCTOR' && (
                        <>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <HSelect
                                    name="gender"
                                    label="Gender"
                                    options={GenderSelect}
                                />
                            </Grid>
                            <Grid
                                size={{ xs: 12, sm: 6 }}
                                order={{ xs: 5, md: 4 }}
                            >
                                <HInput
                                    name="address"
                                    label="Address"
                                    multiline
                                    minRows={2}
                                />
                            </Grid>
                            <Grid
                                size={{ xs: 12, sm: 6 }}
                                order={{ xs: 6, md: 5 }}
                            >
                                <HInput
                                    name="currentWorkingPlace"
                                    label="Current Working Place"
                                    multiline
                                    minRows={2}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} order={7}>
                                <HInput
                                    name="experience"
                                    label="Experience (Years)"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} order={8}>
                                <HInput
                                    name="appointmentFee"
                                    label="Appointment Fee"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} order={9}>
                                <HInput
                                    name="registrationNumber"
                                    label="Registration Number"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }} order={10}>
                                <HInput
                                    name="qualification"
                                    label="Qualification"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }} order={11}>
                                <HInput
                                    name="designation"
                                    label="Designation"
                                />
                            </Grid>
                            <Grid size={12} order={12}>
                                <HMultipleSelect
                                    name="specialties"
                                    label="Specialties"
                                    options={specialtiesOptions}
                                    disabled={isSpecialtiesLoading}
                                />
                            </Grid>
                        </>
                    )}
                </Grid>
                <Box mt={2} textAlign="right">
                    <Button
                        type="submit"
                        sx={{
                            padding: '7px 20px',
                            width: 'fit-content',
                        }}
                    >
                        Update Profile
                    </Button>
                </Box>
            </HFrom>
        </Box>
    );
};

export default EditProfilePage;
