'use client';

import { useGetMetaQuery } from '@/redux/api/metaApi';
import { IDoctorMeta } from '@/types/meta.type';
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Avatar,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FaCalendarAlt, FaUsers, FaStar, FaDollarSign } from 'react-icons/fa';
import Loader from '@/components/shared/Loader/Loader';
import { useGetUserInfoQuery } from '@/redux/api/userApi';

const DoctorDashboardPage = () => {
    const { data, isLoading } = useGetMetaQuery(undefined);
    const meta = data as IDoctorMeta;

    const { data: user, isLoading: isUserLoading } =
        useGetUserInfoQuery(undefined);

    if (isLoading || isUserLoading) {
        return <Loader />;
    }

    if (!meta) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="60vh"
            >
                <Typography variant="h6" color="text.secondary">
                    No data available
                </Typography>
            </Box>
        );
    }

    const pieData =
        meta.appointmentStatusDistribution?.map((item, index) => {
            const colors = [
                '#8884d8',
                '#82ca9d',
                '#ffc658',
                '#ff7300',
                '#00c49f',
            ];
            return {
                name: item.status,
                value: item.count,
                color: colors[index % colors.length],
            };
        }) || [];

    const statCards = [
        {
            title: 'Total Appointments',
            value: meta.appointmentCount || 0,
            icon: <FaCalendarAlt size={24} />,
            color: '#2196f3',
            bgColor: '#e3f2fd',
        },
        {
            title: 'Total Patients',
            value: meta.patientCount || 0,
            icon: <FaUsers size={24} />,
            color: '#4caf50',
            bgColor: '#e8f5e8',
        },
        {
            title: 'Total Reviews',
            value: meta.reviewCount || 0,
            icon: <FaStar size={24} />,
            color: '#ff9800',
            bgColor: '#fff3e0',
        },
        {
            title: 'Total Revenue',
            value: `$${meta.totalRevenue || 0}`,
            icon: <FaDollarSign size={24} />,
            color: '#9c27b0',
            bgColor: '#f3e5f5',
        },
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 3 }, minHeight: '100vh' }}>
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                    sx={{
                        textAlign: { xs: 'center', sm: 'left' },
                        fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                >
                    Welcome{user ? `, Dr. ${user.name}` : ' to Your Dashboard!'}
                </Typography>
            </Box>

            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                sx={{ mb: { xs: 3, md: 4 } }}
            >
                {statCards.map((card, index) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                background: `linear-gradient(135deg, ${card.bgColor} 0%, ${card.color}15 100%)`,
                                border: `1px solid ${card.color}30`,
                                borderRadius: 2,
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: `0 8px 25px ${card.color}25`,
                                },
                            }}
                        >
                            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    flexDirection={{ xs: 'column', sm: 'row' }}
                                    textAlign={{ xs: 'center', sm: 'left' }}
                                    gap={{ xs: 2, sm: 0 }}
                                >
                                    <Box>
                                        <Typography
                                            variant="h4"
                                            fontWeight="bold"
                                            color={card.color}
                                            sx={{
                                                fontSize: {
                                                    xs: '1.5rem',
                                                    md: '2rem',
                                                },
                                            }}
                                        >
                                            {typeof card.value === 'string'
                                                ? card.value
                                                : card.value.toLocaleString()}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 1 }}
                                        >
                                            {card.title}
                                        </Typography>
                                    </Box>
                                    <Avatar
                                        sx={{
                                            bgcolor: card.color,
                                            width: { xs: 48, md: 56 },
                                            height: { xs: 48, md: 56 },
                                        }}
                                    >
                                        {card.icon}
                                    </Avatar>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid size={{ xs: 12 }}>
                    <Card
                        sx={{
                            borderRadius: 2,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        }}
                    >
                        <CardContent
                            sx={{
                                p: { xs: 2, md: 3 },
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                                sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                            >
                                Appointment Status Distribution
                            </Typography>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <ResponsiveContainer width="100%" height={400}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={140}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.color}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '8px',
                                                boxShadow:
                                                    '0 4px 12px rgba(0,0,0,0.1)',
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>

                            <Box
                                sx={{
                                    mt: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                }}
                            >
                                {pieData.map((item, index) => (
                                    <Box
                                        key={index}
                                        display="flex"
                                        alignItems="center"
                                        sx={{
                                            mb: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                backgroundColor: item.color,
                                                borderRadius: '50%',
                                                mr: 1,
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                fontSize: {
                                                    xs: '0.75rem',
                                                    md: '0.875rem',
                                                },
                                            }}
                                        >
                                            {item.name}: {item.value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DoctorDashboardPage;
