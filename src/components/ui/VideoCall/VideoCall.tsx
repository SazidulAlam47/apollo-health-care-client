'use client';

import React, { useState } from 'react';
import AgoraUIKit from 'agora-react-uikit';
import { useRouter } from 'next/navigation';
import { Button, Stack } from '@mui/material';
import { IoVideocam } from 'react-icons/io5';
import { getUserInfo } from '@/services/auth.service';
import {
    useUpdateAppointmentStatusMutation,
    useVerifyVideoCallQuery,
} from '@/redux/api/appointmentApi';
import Loader from '@/components/shared/Loader/Loader';
import { toast } from 'sonner';

const VideoCall = ({ videoCallingId }: { videoCallingId: string }) => {
    const { data: appointment, isLoading } =
        useVerifyVideoCallQuery(videoCallingId);
    const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();
    const [videoCall, setVideoCall] = useState(false);
    const router = useRouter();
    const user = getUserInfo();

    const rtcProps = {
        appId: process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID as string,
        channel: videoCallingId,
        token: null,
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!appointment) {
        return router.push('/');
    }

    const callbacks = {
        EndCall: async () => {
            if (user?.role === 'DOCTOR') {
                const payload = {
                    id: appointment.id,
                    data: {
                        status: 'COMPLETED',
                    },
                };

                const toastId = toast.loading('Ending Video Call...');
                try {
                    const res = await updateAppointmentStatus(payload).unwrap();
                    if (res.id) {
                        toast.success('Video call Ended', {
                            id: toastId,
                        });
                        setVideoCall(false);
                        router.push('/');
                    } else {
                        toast.error('Something went wrong', {
                            id: toastId,
                        });
                    }
                } catch (error: any) {
                    toast.error(
                        error.message || error.data || 'Something went wrong',
                        {
                            id: toastId,
                        },
                    );
                }
            } else {
                setVideoCall(false);
                toast.success('Video call Ended');
                router.push('/');
            }
        },
    };

    return videoCall ? (
        <Stack
            sx={{
                width: '100%',
                height: '100dvh',
            }}
        >
            <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </Stack>
    ) : (
        <Stack
            sx={{
                width: '100%',
                height: '100dvh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Button
                startIcon={<IoVideocam />}
                onClick={() => setVideoCall(true)}
            >
                Start Call
            </Button>
        </Stack>
    );
};

export default VideoCall;
