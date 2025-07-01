import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoClose } from 'react-icons/io5';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {
    Dispatch,
    forwardRef,
    ReactElement,
    ReactNode,
    Ref,
    SetStateAction,
} from 'react';
import { Box, SxProps } from '@mui/material';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<unknown>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type THFullScreenModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title?: string;
    children: ReactNode;
    sx?: SxProps;
};

const HFullScreenModal = ({
    open,
    setOpen,
    title = '',
    children,
    sx = {},
}: THFullScreenModalProps) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            slots={{
                transition: Transition,
            }}
            sx={sx}
        >
            <AppBar
                sx={{
                    position: 'relative',
                    backgroundColor: '#e0e0e0',
                    color: '#000',
                }}
            >
                <Toolbar>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
                        {title}
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <IoClose />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box padding={{ xs: 2, sm: 3, md: 5 }}>{children}</Box>
        </Dialog>
    );
};

export default HFullScreenModal;
