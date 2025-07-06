export const UserRole = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    DOCTOR: 'DOCTOR',
    PATIENT: 'PATIENT',
};

export const Gender = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
};

export const GenderSelect = Object.values(Gender).map((g) => ({
    value: g,
    label: g,
}));

export const UserStatus = {
    ACTIVE: 'ACTIVE',
    BLOCKED: 'BLOCKED',
    DELETED: 'DELETED',
};
