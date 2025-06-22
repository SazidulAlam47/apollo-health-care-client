'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import { IoMenu } from 'react-icons/io5';
import headerMenuLinks from '../../../constants/headerMenuLinks';
import Link from 'next/link';

const HeaderMobileDrawer = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <Box display={{ xs: 'block', md: 'none' }}>
            <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                sx={{
                    paddingRight: 0,
                    ':hover': {
                        background: 'inherit',
                    },
                }}
            >
                <IoMenu />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                >
                    <List>
                        {headerMenuLinks.map((menu, index) => (
                            <ListItem
                                key={index}
                                disablePadding
                                component={Link}
                                href={menu.route}
                            >
                                <ListItemButton>
                                    <ListItemText primary={menu.title} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};

export default HeaderMobileDrawer;
