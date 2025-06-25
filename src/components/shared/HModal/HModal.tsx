import { styled, SxProps } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { IoClose } from 'react-icons/io5';
import { Dispatch, ReactNode, SetStateAction } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type THModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title?: string;
    children: ReactNode;
    sx?: SxProps;
};

const HModal = ({
    open,
    setOpen,
    title = '',
    children,
    sx = {},
}: THModalProps) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={sx}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {title}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <IoClose />
            </IconButton>
            <DialogContent dividers>{children}</DialogContent>
        </BootstrapDialog>
    );
};

export default HModal;
