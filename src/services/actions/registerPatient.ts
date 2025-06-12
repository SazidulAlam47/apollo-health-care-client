'use server';
const registerPatient = async (formData: FormData) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/create-patient`,
        {
            method: 'POST',
            body: formData,
            cache: 'no-store',
        },
    );
    const patientInfo = await res.json();
    return patientInfo;
};

export default registerPatient;
