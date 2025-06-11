import HeroSection from '@/components/ui/HomePage/HeroSection/HeroSection';
import HowItWorks from '@/components/ui/HomePage/HowItWorks/HowItWorks';
import Specialties from '@/components/ui/HomePage/Specialties/Specialties';
import TopRatedDoctors from '@/components/ui/HomePage/TopRatedDoctors/TopRatedDoctors';
import WhyUs from '@/components/ui/HomePage/WhyUs/WhyUs';

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <Specialties />
            <TopRatedDoctors />
            <WhyUs />
            <HowItWorks />
        </>
    );
};

export default HomePage;
