import { JwtPayload } from 'jwt-decode';

export type TDecodedUser = JwtPayload & {
    email: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'DOCTOR' | 'PATIENT';
};
