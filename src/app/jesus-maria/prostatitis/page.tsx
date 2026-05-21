import { TestimonialBubbles } from "../../components/TestimonialBubbles";
import { Treatment } from "../../components/Treatment/Treatment";
import { AboutDevice } from "../../components/AboutDevice";
import { Questions } from "../../components/Questions";
import { AppointmentCta } from "../../components/AppointmentCta";
import { HeroContact } from "../../components/hero-1/HeroContact";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { questionProstatitis } from "@/data/questions/questionProstatitis";
import { jesusMariaData } from "@/data/sedes/jesus-maria";
import { Footer } from "@/app/components/Footer";
//import { PageWrapper } from '@/components/ui/PageWrapper'
import { TitleProvider } from '@/contexts/TitleContext'
import { messagesProstatitis } from "@/data/messages/messagesProstatitis";
import { treatmentBenefits } from "@/data/treatmentBenefits";

export default function ProstatitisJesusMaria() {
  return (
    //<PageWrapper 
      //sede="Jesús María" 
      //tratamiento="Prostatitis"
      //spinWheelProps={{
        //autoShowDelay: 1,
        //spinDuration: 5,
        //firstSpinAngle: 315,
        //secondSpinAngle: 225,
        //showCloseButton: false
      //}}
    //>
    <TitleProvider sede="Jesús María" tratamiento="Prostatitis">
      {/* Hero Section */}
      <HeroContact
        title="¿Tienes molestias al orinar o dolor persistente?"
        subtitle="Podrías tener prostatitis crónica y no saberlo."
        image="/campanas/prostatitis/assets/images/sections/header/u-hero-prostatitis.png"
        imageMobile="/campanas/prostatitis/assets/images/sections/header/u-hero-prostatitis.png"
        description="Agenda tu cita ahora y recupera tu calidad de vida con nuestro tratamiento avanzado con Ondas de Choque."
        gestorData={jesusMariaData.landings.prostatitis}
        tratamiento="Prostatitis"
        sede="Jesús María"
        redirectToWhatsapp={{
          number: jesusMariaData.landings.prostatitis.whatsapp,
          message: jesusMariaData.landings.prostatitis.message,
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
        whatsappNumber={jesusMariaData.landings.prostatitis.whatsapp}
        whatsappMessage={jesusMariaData.landings.prostatitis.message}
        useModal={true}
        sede="Jesús María"
        tratamiento="Prostatitis"
      />
      {/* Preguntas Section */}
      <Questions questions={questionProstatitis} />
      {/* WhatsApp Flotante */}
      <FloatingWhatsApp
        phoneNumber={jesusMariaData.landings.prostatitis.whatsapp}
        message={jesusMariaData.landings.prostatitis.message}
        tooltipText="¡Conversemos por WhatsApp!"
        useModal={true}
        sede="Jesús María"
        tratamiento="Prostatitis"
      />
      {/* Footer */}
      <Footer
          address={jesusMariaData.address}
          phone={jesusMariaData.landings.prostatitis.whatsapp}
          email={jesusMariaData.email}
          socials={jesusMariaData.socials}
        />
    </TitleProvider>
  );
} 