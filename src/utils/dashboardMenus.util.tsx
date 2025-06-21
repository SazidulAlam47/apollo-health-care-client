import { TUserRole } from '@/types';
import { Navigation } from '@toolpad/core/AppProvider';
import { MdOutlinePerson, MdOutlineKey } from 'react-icons/md';

export const getDashboardMenus = (role: TUserRole): Navigation => {
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
                segment: `dashboard/${role === 'SUPER_ADMIN' ? 'super-admin' : role.toLocaleLowerCase()}/${navigation.segment}`,
                title: navigation.title,
                icon: navigation.icon,
            };
        } else {
            return navigation;
        }
    });
    return result;
};

export const createAccountMenu = (role: TUserRole): Navigation => {
    return [
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Account',
        },
        {
            segment: `${role === 'SUPER_ADMIN' ? 'super-admin' : role.toLocaleLowerCase()}/profile`,
            title: 'Profile',
            icon: <MdOutlinePerson />,
        },
        {
            segment: 'change-password',
            title: 'Change Password',
            icon: <MdOutlineKey />,
        },
    ];
};
