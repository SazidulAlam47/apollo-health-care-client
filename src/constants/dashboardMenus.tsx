import { Navigation } from '@toolpad/core/AppProvider';
import {
    MdDashboard,
    MdOutlineMedicalInformation,
    MdOutlineCalendarMonth,
    MdReviews,
    MdOutlinePerson,
    MdOutlineKey,
    MdOutlineAttachMoney,
    MdOutlineReceiptLong,
} from 'react-icons/md';
import { FaUserGroup } from 'react-icons/fa6';
import { GiStethoscope } from 'react-icons/gi';
import { RiBookOpenLine } from 'react-icons/ri';

export const superAdminMenus: Navigation = [
    {
        kind: 'header',
        title: 'Dashboard Menu',
    },
    {
        segment: 'dashboard/super-admin',
        title: 'Dashboard',
        icon: <MdDashboard />,
    },
    {
        segment: 'dashboard/super-admin/manage-users',
        title: 'Manage Users',
        icon: <FaUserGroup />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Account',
    },
    {
        segment: 'dashboard/super-admin/profile',
        title: 'Profile',
        icon: <MdOutlinePerson />,
    },
    {
        segment: 'dashboard/super-admin/change-password',
        title: 'Change Password',
        icon: <MdOutlineKey />,
    },
];

export const adminMenus: Navigation = [
    {
        kind: 'header',
        title: 'Dashboard Menu',
    },
    {
        segment: 'dashboard/admin',
        title: 'Dashboard',
        icon: <MdDashboard />,
    },
    {
        segment: 'dashboard/admin/manage-users',
        title: 'Manage Users',
        icon: <FaUserGroup />,
    },
    {
        segment: 'dashboard/admin/specialties',
        title: 'Specialties',
        icon: <GiStethoscope />,
    },
    {
        segment: 'dashboard/admin/doctors',
        title: 'Doctors',
        icon: <MdOutlineMedicalInformation />,
    },
    {
        segment: 'dashboard/admin/schedules',
        title: 'Schedules',
        icon: <MdOutlineCalendarMonth />,
    },
    {
        segment: 'dashboard/admin/appointments',
        title: 'Appointments',
        icon: <RiBookOpenLine />,
    },
    {
        segment: 'dashboard/admin/reviews',
        title: 'Reviews',
        icon: <MdReviews />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Account',
    },
    {
        segment: 'dashboard/admin/profile',
        title: 'Profile',
        icon: <MdOutlinePerson />,
    },
    {
        segment: 'dashboard/admin/change-password',
        title: 'Change Password',
        icon: <MdOutlineKey />,
    },
];

export const doctorMenus: Navigation = [
    {
        kind: 'header',
        title: 'Dashboard Menu',
    },
    {
        segment: 'dashboard/doctor',
        title: 'Dashboard',
        icon: <MdDashboard />,
    },
    {
        segment: 'dashboard/doctor/schedules',
        title: 'Schedules',
        icon: <MdOutlineCalendarMonth />,
    },
    {
        segment: 'dashboard/doctor/appointment',
        title: 'Appointments',
        icon: <RiBookOpenLine />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Account',
    },
    {
        segment: 'dashboard/doctor/profile',
        title: 'Profile',
        icon: <MdOutlinePerson />,
    },
    {
        segment: 'dashboard/doctor/change-password',
        title: 'Change Password',
        icon: <MdOutlineKey />,
    },
];

export const patientMenus: Navigation = [
    {
        kind: 'header',
        title: 'Dashboard Menu',
    },
    {
        segment: 'dashboard/patient/appointments',
        title: 'Appointments',
        icon: <RiBookOpenLine />,
    },
    {
        segment: 'dashboard/patient/prescriptions',
        title: 'Prescriptions',
        icon: <MdOutlineReceiptLong />,
    },
    {
        segment: 'dashboard/patient/payment-history',
        title: 'Payment History',
        icon: <MdOutlineAttachMoney />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Account',
    },
    {
        segment: 'dashboard/patient/profile',
        title: 'Profile',
        icon: <MdOutlinePerson />,
    },
    {
        segment: 'dashboard/patient/change-password',
        title: 'Change Password',
        icon: <MdOutlineKey />,
    },
];
