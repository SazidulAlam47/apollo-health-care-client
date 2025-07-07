import { TUserRole } from './user.type';

export interface ILogin {
    accessToken: string;
    needPasswordChange: boolean;
    role: TUserRole;
}
