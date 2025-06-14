import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/lib/Providers/Providers';
import { Toaster } from '@/components/ui/sonner';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Apollo Health Care',
    description: 'Online Telemedicine Service',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <Providers>
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <Toaster position="top-center" />
                    {children}
                </body>
            </html>
        </Providers>
    );
}
