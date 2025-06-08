import HeroSection from '@/components/ui/HomePage/HeroSection/HeroSection';
import Specialties from '@/components/ui/HomePage/Specialties/Specialties';
import TopRatedDoctors from '@/components/ui/HomePage/TopRatedDoctors/TopRatedDoctors';

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <Specialties />
            <TopRatedDoctors />
        </>
    );
};

export default HomePage;
