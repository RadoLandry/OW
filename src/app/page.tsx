import Hero from "@/components/Hero";
import Maps from "@/components/Maps";
import Liturgie from "@/components/Liturgie";
import RsvpForm from "@/components/RsvpForm";
import VoeuxSlider from "@/components/VoeuxSlider";
import InfosPratiques from "@/components/InfosPratiques";

export default function Home() {
  return (
    <main className="bg-weddingWhite">
      <Hero />
      <Maps />
      <Liturgie />
      <RsvpForm />
      <VoeuxSlider />
      <InfosPratiques />
    </main>
  );
}
