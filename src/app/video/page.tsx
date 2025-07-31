import VideoCall from '@/components/ui/VideoCall/VideoCall';

const VideoCallingPage = ({
    searchParams,
}: {
    searchParams: { videoCallingId: string };
}) => {
    const { videoCallingId } = searchParams;

    return <VideoCall videoCallingId={videoCallingId} />;
};

export default VideoCallingPage;
