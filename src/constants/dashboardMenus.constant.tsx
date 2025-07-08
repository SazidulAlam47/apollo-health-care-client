import { Navigation, NavigationItem } from '@toolpad/core/AppProvider';
import {
    MdDashboard,
    MdOutlineMedicalInformation,
    MdOutlineCalendarMonth,
    MdReviews,
    MdOutlineAttachMoney,
    MdOutlineReceiptLong,
    MdOutlinePerson,
    MdOutlineKey,
} from 'react-icons/md';
import { FaUserGroup } from 'react-icons/fa6';
import { GiStethoscope } from 'react-icons/gi';
import { RiBookOpenLine } from 'react-icons/ri';
import { createMenusWithBaseRoute } from '@/utils/dashboardMenus.util';

const header: NavigationItem = {
    kind: 'header',
    title: 'Dashboard Menu',
};

const accountMenu: Navigation = [
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Account',
    },
    {
        segment: 'dashboard/profile',
        title: 'Profile',
        icon: <MdOutlinePerson />,
    },
    {
        segment: 'dashboard/change-password',
        title: 'Change Password',
        icon: <MdOutlineKey />,
    },
];

export const superAdminMenus: Navigation = [
    ...createMenusWithBaseRoute('SUPER_ADMIN', [
        header,
        {
            segment: '',
            title: 'Dashboard',
            icon: <MdDashboard />,
        },
        {
            segment: 'manage-users',
            title: 'Manage Users',
            icon: <FaUserGroup />,
        },
    ]),
    ...accountMenu,
];

export const adminMenus: Navigation = [
    ...createMenusWithBaseRoute('ADMIN', [
        header,
        {
            segment: '',
            title: 'Dashboard',
            icon: <MdDashboard />,
        },
        {
            segment: 'specialties',
            title: 'Specialties',
            icon: <GiStethoscope />,
        },
        {
            segment: 'doctors',
            title: 'Doctors',
            icon: <MdOutlineMedicalInformation />,
        },
        {
            segment: 'schedules',
            title: 'Schedules',
            icon: <MdOutlineCalendarMonth />,
        },
        {
            segment: 'appointments',
            title: 'Appointments',
            icon: <RiBookOpenLine />,
        },
        {
            segment: 'reviews',
            title: 'Reviews',
            icon: <MdReviews />,
        },
    ]),
    ...accountMenu,
];

export const doctorMenus: Navigation = [
    ...createMenusWithBaseRoute('DOCTOR', [
        header,
        {
            segment: '',
            title: 'Dashboard',
            icon: <MdDashboard />,
        },
        {
            segment: 'schedules',
            title: 'Schedules',
            icon: <MdOutlineCalendarMonth />,
        },
        {
            segment: 'appointment',
            title: 'Appointments',
            icon: <RiBookOpenLine />,
        },
    ]),
    ...accountMenu,
];

export const patientMenus: Navigation = [
    ...createMenusWithBaseRoute('PATIENT', [
        header,
        {
            segment: '',
            title: 'Dashboard',
            icon: <MdDashboard />,
        },
        {
            segment: 'appointments',
            title: 'Appointments',
            icon: <RiBookOpenLine />,
        },
        {
            segment: 'prescriptions',
            title: 'Prescriptions',
            icon: <MdOutlineReceiptLong />,
        },
        {
            segment: 'payment-history',
            title: 'Payment History',
            icon: <MdOutlineAttachMoney />,
        },
    ]),
    ...accountMenu,
];
