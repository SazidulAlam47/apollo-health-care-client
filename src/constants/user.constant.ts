import generateSelectOptions from '@/utils/generateSelectOptions';

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

export const UserStatus = {
    ACTIVE: 'ACTIVE',
    BLOCKED: 'BLOCKED',
    DELETED: 'DELETED',
};

export const BloodGroup = {
    A_POSITIVE: 'A_POSITIVE',
    B_POSITIVE: 'B_POSITIVE',
    O_POSITIVE: 'O_POSITIVE',
    AB_POSITIVE: 'AB_POSITIVE',
    A_NEGATIVE: 'A_NEGATIVE',
    B_NEGATIVE: 'B_NEGATIVE',
    O_NEGATIVE: 'O_NEGATIVE',
    AB_NEGATIVE: 'AB_NEGATIVE',
};

export const MaritalStatus = {
    MARRIED: 'MARRIED',
    UNMARRIED: 'UNMARRIED',
};

export const GenderSelect = generateSelectOptions(Gender);
export const BloodGroupSelect = generateSelectOptions(BloodGroup);
export const MaritalStatusSelect = generateSelectOptions(MaritalStatus);
