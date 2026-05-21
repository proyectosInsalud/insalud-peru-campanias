import { TestimonialBubbles } from "../../components/TestimonialBubbles";
import { Treatment } from "../../components/Treatment/Treatment";
import { AboutDevice } from "../../components/AboutDevice";
import { Questions } from "../../components/Questions";
import { AppointmentCta } from "../../components/AppointmentCta";
import { HeroContact } from "../../components/hero-1/HeroContact";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { questionProstatitis } from "@/data/questions/questionProstatitis";
import { golfData } from "@/data/sedes/golf";
import { Footer } from "@/app/components/Footer";
//import { PageWrapper } from '@/components/ui/PageWrapper'
import { TitleProvider } from '@/contexts/TitleContext'
import { messagesProstatitis } from "@/data/messages/messagesProstatitis";
import { treatmentBenefits } from "@/data/treatmentBenefits";

export default function ProstatitisGolf() {
  return (
    //<PageWrapper 
      //sede="Golf" 
      //tratamiento="Prostatitis"
      //spinWheelProps={{
        //autoShowDelay: 1,
        //spinDuration: 5,
        //firstSpinAngle: 315,
        //secondSpinAngle: 225,
        //showCloseButton: false
      //}}
    //>
    <TitleProvider sede="Golf" tratamiento="Prostatitis">
      {/* Hero Section */}
      <HeroContact
        title="¿Tienes molestias al orinar o dolor persistente?"
        subtitle="Podrías tener prostatitis crónica y no saberlo."
        image="/campanas/prostatitis/assets/images/sections/header/u-hero-prostatitis.png"
        imageMobile="/campanas/prostatitis/assets/images/sections/header/u-hero-prostatitis.png"
        description="Agenda tu cita ahora y recupera tu calidad de vida con nuestro tratamiento avanzado con Ondas de Choque."
        gestorData={golfData.landings.prostatitis}
        tratamiento="Prostatitis"
        sede="Golf"
        redirectToWhatsapp={{
          number: golfData.landings.prostatitis.whatsapp,
          message: golfData.landings.prostatitis.message,
        }}
      />
      {/* Testimonios Section */}
      <TestimonialBubbles
        messages={messagesProstatitis}
      />
      {/* Beneficios Section */}
      <section id="beneficios">
        <Treatment
          titleWithColors="¿Por qué tratarse con {cyan}Ondas de choque? {/cyan}"
          subtitle="Conoce los beneficios que te ofrece este tratamiento."
          cards={treatmentBenefits}
        />
      </section>
      {/* Tecnología Section */}
      <AboutDevice
           titleWithColors="Equipos {blue}profesionales de primer nivel y{/blue} Médicos especialistas {blue}certificados{/blue}"
          multipleImages={false}
          srcDesktop={"/campanas/disfuncion/assets/images/sections/main/u-disfuncion-device.png"}
          alt="Dispositivo de disfunción eréctil"
      />
      {/* Call to Action */}
      <AppointmentCta
        title="Recupera tu calidad de vida con nuestro tratamiento avanzado con Ondas de Choque"
        description="Nuestro equipo de especialistas está listo para ayudarte a dar el primer paso hacia tu bienestar."
        titleMobile="Recupera tu calidad de vida con nuestro tratamiento avanzado con Ondas de Choque "
        whatsappNumber={golfData.landings.prostatitis.whatsapp}
        whatsappMessage={golfData.landings.prostatitis.message}
        useModal={true}
        sede="Golf"
        tratamiento="Prostatitis"
      />
      {/* Preguntas Section */}
      <Questions questions={questionProstatitis} />
      {/* WhatsApp Flotante */}
      <FloatingWhatsApp
        phoneNumber={golfData.landings.prostatitis.whatsapp}
        message={golfData.landings.prostatitis.message}
        tooltipText="¡Conversemos por WhatsApp!"
        useModal={true}
        sede="Golf"
        tratamiento="Prostatitis"
      />
      {/* Footer */}
      <Footer
          address={golfData.address}
          phone={golfData.landings.prostatitis.whatsapp}
          email={golfData.email}
          socials={golfData.socials}
        />
        </TitleProvider>
  );
} 