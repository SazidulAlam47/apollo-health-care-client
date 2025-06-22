import { Navigation, NavigationItem } from '@toolpad/core/AppProvider';
import {
    MdDashboard,
    MdOutlineMedicalInformation,
    MdOutlineCalendarMonth,
    MdReviews,
    MdOutlineAttachMoney,
    MdOutlineReceiptLong,
} from 'react-icons/md';
import { FaUserGroup } from 'react-icons/fa6';
import { GiStethoscope } from 'react-icons/gi';
import { RiBookOpenLine } from 'react-icons/ri';
import {
    createAccountMenu,
    createMenusWithBaseRoute,
} from '@/utils/dashboardMenus.util';

const header: NavigationItem = {
    kind: 'header',
    title: 'Dashboard Menu',
};

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
    ...createAccountMenu('SUPER_ADMIN'),
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
    ...createAccountMenu('ADMIN'),
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
    ...createAccountMenu('DOCTOR'),
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
    ...createAccountMenu('PATIENT'),
];
