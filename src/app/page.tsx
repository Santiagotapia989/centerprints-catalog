import Hero from "@/components/Hero";
import InfoStrip from "@/components/InfoStrip";
import Catalog from "@/components/Catalog";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <InfoStrip />
      <Catalog />
      <LocationSection />
      <ContactSection />
    </>
  );
}