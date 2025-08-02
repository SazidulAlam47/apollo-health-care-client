export const defaultLogin = {
    email: '',
    password: '',
};

export const superAdminLogin = {
    email: process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL as string,
    password: process.env.NEXT_PUBLIC_SUPER_ADMIN_PASSWORD as string,
};

export const adminLogin = {
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL as string,
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string,
};

export const doctorLogin = {
    email: process.env.NEXT_PUBLIC_DOCTOR_EMAIL as string,
    password: process.env.NEXT_PUBLIC_DOCTOR_PASSWORD as string,
};

export const patientLogin = {
    email: process.env.NEXT_PUBLIC_PATIENT_EMAIL as string,
    password: process.env.NEXT_PUBLIC_PATIENT_PASSWORD as string,
};
