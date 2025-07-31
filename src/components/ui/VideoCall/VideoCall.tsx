'use client';

import React, { useState } from 'react';
import AgoraUIKit from 'agora-react-uikit';
import { useRouter } from 'next/navigation';
import { Button, Stack } from '@mui/material';
import { IoVideocam } from 'react-icons/io5';

const VideoCall = ({ videoCallingId }: { videoCallingId: string }) => {
    const [videoCall, setVideoCall] = useState(false);
    const router = useRouter();

    const rtcProps = {
        appId: process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID as string,
        channel: videoCallingId,
        token: null,
    };
    const callbacks = {
        EndCall: () => {
            setVideoCall(false);
            router.push('/');
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
