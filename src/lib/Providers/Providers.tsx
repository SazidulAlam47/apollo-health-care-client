'use client';
import { ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import theme from '../theme/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store';

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider theme={theme}>
                <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
            </ThemeProvider>
        </ReduxProvider>
    );
};

export default Providers;
