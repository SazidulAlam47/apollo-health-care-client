import { Navigation } from '@toolpad/core/AppProvider';
import { MdDashboard } from 'react-icons/md';

export const navigation: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <MdDashboard />,
    },
    {
        segment: 'dashboard/admin',
        title: 'Admin',
        icon: <MdDashboard />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <MdDashboard />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <MdDashboard />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <MdDashboard />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <MdDashboard />,
    },
];
