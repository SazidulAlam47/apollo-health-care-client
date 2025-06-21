import { MouseEvent, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FiLogOut } from 'react-icons/fi';
import { removeUser } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { Stack } from '@mui/material';
import userMenuSlotProps from '@/constants/userMenuSlotProps';
import getDrawerItems from '@/utils/getDrawerItems';

export default function AccountMenu() {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        toast.success('Logged out successfully');
        removeUser();
        router.refresh();
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
                            alt="Sharp"
                            src="https://avatars.githubusercontent.com/u/19550456"
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
                {getDrawerItems('ADMIN').map((item) => {
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
                                key={item.segment}
                                component={Link}
                                href={item.segment}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                {item.title}
                            </MenuItem>
                        );
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
}
