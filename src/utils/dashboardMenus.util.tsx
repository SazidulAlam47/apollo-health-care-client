import { TUserRole } from '@/types';
import { Navigation } from '@toolpad/core/AppProvider';
import getRoleLowerCase from './getRoleLowerCase';

export const getDashboardMenus = (role: TUserRole | undefined): Navigation => {
    const menus = require('@/constants/dashboardMenus.constant');

    switch (role) {
        case 'SUPER_ADMIN':
            return menus.superAdminMenus;
        case 'ADMIN':
            return menus.adminMenus;
        case 'DOCTOR':
            return menus.doctorMenus;
        case 'PATIENT':
            return menus.patientMenus;
        default:
            return [];
    }
};

export const createMenusWithBaseRoute = (
    role: TUserRole,
    navigations: Navigation,
): Navigation => {
    const result = navigations.map((navigation) => {
        if (
            'segment' in navigation &&
            'title' in navigation &&
            'icon' in navigation
        ) {
            return {
                segment: `dashboard/${getRoleLowerCase(role)}${navigation.segment && '/' + navigation.segment}`,
                title: navigation.title,
                icon: navigation.icon,
            };
        } else {
            return navigation;
        }
    });
    return result;
};
