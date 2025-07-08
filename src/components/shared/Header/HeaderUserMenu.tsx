import { MouseEvent, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FiLogOut } from 'react-icons/fi';
import { getUserInfo, userLogout } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Stack } from '@mui/material';
import userMenuSlotProps from '@/constants/userMenuSlotProps';
import { getDashboardMenus } from '@/utils/dashboardMenus.util';
import { TUserRole } from '@/types';
import { useGetSingleUserQuery } from '@/redux/api/userApi';
import { toast } from 'sonner';

const AccountMenu = () => {
    const { data: user } = useGetSingleUserQuery({});
    const [userRole, setUserRole] = useState<TUserRole | undefined>(undefined);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();

    const open = !!anchorEl;

    useEffect(() => {
        const userInfo = getUserInfo();
        setUserRole(userInfo!.role);
    }, []);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        const toastId = toast.loading('Logging out...');
        try {
            await userLogout();
            router.refresh();
            toast.success('Logged out successfully', { id: toastId });
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    return (
        <>
            <Stack direction="row" alignItems="center" textAlign="center">
                <Tooltip title="Account">
                    <IconButton
                        onClick={handleClick}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            alt={user?.name || 'User'}
                            src={
                                user?.profilePhoto
                                    ? user.profilePhoto
                                    : undefined
                            }
                        />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={userMenuSlotProps}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {getDashboardMenus(userRole).map((item, index) => {
                    if (
                        'segment' in item &&
                        'title' in item &&
                        'icon' in item &&
                        typeof item.segment === 'string' &&
                        typeof item.title === 'string' &&
                        typeof item.icon === 'object'
                    )
                        return (
                            <MenuItem
                                key={index}
                                component={Link}
                                href={item.segment}
                                sx={{ mb: 0.5 }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                {item.title}
                            </MenuItem>
                        );
                    if ('kind' in item && item.kind === 'divider') {
                        return <Divider key={index} />;
                    }
                    return null;
                })}

                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <FiLogOut />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default AccountMenu;
