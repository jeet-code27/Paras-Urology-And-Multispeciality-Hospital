import AboutSection from "@/components/HomePage/AboutSection";
import DoctorsSlider from "@/components/HomePage/DoctorSlider";
import DoctorsProfile from "@/components/HomePage/DoctorsProfile";
import EmpanelmentsSlider from "@/components/HomePage/EmpanelmentsSlider";
import GallerySlider from "@/components/HomePage/GallerySlider";
import HeroSection from "@/components/HomePage/HeroSection";
import HospitalAppointment from "@/components/HomePage/HospitalAppointment";
import StatsSection from "@/components/HomePage/StatsSection";


export default function Home() {
  return (
   <main>
    <HeroSection />
    <StatsSection/>
    <AboutSection/>
    <DoctorsSlider/>
    <EmpanelmentsSlider/>
    <GallerySlider/>
    <div className="pb-10 bg-white">
    <HospitalAppointment/>
    </div>
    <DoctorsProfile/>

   </main>
  );
}
