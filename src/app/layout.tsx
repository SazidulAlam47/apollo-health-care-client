import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Providers from '@/lib/Providers/Providers';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

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
                    <AppRouterCacheProvider>
                        <Toaster position="top-center" />
                        {children}
                    </AppRouterCacheProvider>
                </body>
            </html>
        </Providers>
    );
}
