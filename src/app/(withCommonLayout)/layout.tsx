import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar/Navbar';
import { ReactNode } from 'react';

const CommonLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="min-h-[100dvh]">{children}</div>
            <Footer />
        </>
    );
};

export default CommonLayout;
