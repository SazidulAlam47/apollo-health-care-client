import {
    adminMenus,
    doctorMenus,
    patientMenus,
    superAdminMenus,
} from '@/constants/dashboardMenus';
import { TUserRole } from '@/types';
import { Navigation } from '@toolpad/core/AppProvider';

const getDrawerItems = (role: TUserRole): Navigation => {
    switch (role) {
        case 'SUPER_ADMIN':
            return superAdminMenus;
        case 'ADMIN':
            return adminMenus;
        case 'DOCTOR':
            return doctorMenus;
        case 'PATIENT':
            return patientMenus;
        default:
            return [];
    }
};

export default getDrawerItems;
