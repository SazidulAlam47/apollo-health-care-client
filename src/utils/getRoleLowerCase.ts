import { TUserRole } from '@/types';

const getRoleLowerCase = (role: TUserRole) => {
    return role === 'SUPER_ADMIN' ? 'super-admin' : role.toLocaleLowerCase();
};

export default getRoleLowerCase;
