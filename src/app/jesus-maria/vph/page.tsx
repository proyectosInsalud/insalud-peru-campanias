import { TestimonialBubbles } from "../../components/TestimonialBubbles";
import { Treatment } from "../../components/Treatment/Treatment";
import { AboutDevice } from "../../components/AboutDevice";
import { Questions } from "../../components/Questions";
import { AppointmentCta } from "../../components/AppointmentCta";
import { HeroContact } from "../../components/hero-1/HeroContact";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { questionVph } from "@/data/questions/questionVph";
import { jesusMariaData } from "@/data/sedes/jesus-maria";
import { Footer } from "@/app/components/Footer";
//import { PageWrapper } from '@/components/ui/PageWrapper'
import { TitleProvider } from '@/contexts/TitleContext'
import { messagesVph } from "@/data/messages/messagesVph";
import { vphBenefits } from "@/data/vphBenefits";

export default function VphJesusMaria() {
  return (
    // WRAPPER COMENTADO TEMPORALMENTE - Solo usamos TitleProvider sin la ruleta
    // <PageWrapper 
    //   sede="Jesús María" 
    //   tratamiento="VPH"
    //   spinWheelProps={{
    //     autoShowDelay: 1,
    //     spinDuration: 5,
    //     firstSpinAngle: 315,
    //     secondSpinAngle: 225,
    //     showCloseButton: false
    //   }}
    // >
    <TitleProvider sede="Jesús María" tratamiento="VPH">
      {/* Hero Section */}
      <HeroContact
        imageMobile="/campanas/vph-jesus-maria/assets/images/sections/header/grafico-vph-mobile.png"
        image="/campanas/vph-jesus-maria/assets/images/sections/header/u-hero-image.png"
        title="¿Tienes verrugas genitales? "
        subtitle="Podrías tener VPH y no saberlo"
        description="Agenda tu cita y elimina verrugas sin dañar tu piel. ¡Reclama tu atención gratuita!"
        gestorData={jesusMariaData.landings.vph}
        tratamiento="VPH"
        sede="Jesús María"
        redirectToWhatsapp={{
          number: jesusMariaData.landings.vph.whatsapp,
          message: jesusMariaData.landings.vph.message,
        }}
      />
      {/* Testimonios Section */}
      <TestimonialBubbles
        messages={messagesVph}
      />
      {/* Beneficios Section */}
      <section id="beneficios">
        <Treatment
          titleWithColors="¿Por qué tratarse con {cyan}Láser CO2?{/cyan}"
          subtitle="Conoce los beneficios que te ofrece este tratamiento."
          cards={vphBenefits}
        />
      </section>
      {/* Tecnología Section */}
      <AboutDevice
        titleWithColors="Equipos {blue}profesionales de primer nivel y{/blue} Médicos especialistas {blue}certificados{/blue}"
        multipleImages={true}
        srcDesktop={
          "/campanas/vph-jesus-maria/assets/images/sections/main/equipo-vph.png"
        }
        srcMobile={
          "/campanas/vph-jesus-maria/assets/images/sections/main/equipo-vph-mobile.png"
        }
        alt="Equipo médico láser CO2"
      />
      {/* Call to Action */}
      <AppointmentCta
        title="Recupera tu confianza con un tratamiento clínico eficaz y personalizado"
        description="Nuestro equipo de especialistas está listo para ayudarte a dar el primer paso hacia tu bienestar."
        titleMobile="Recupera tu confianza con un tratamiento clínico eficaz y personalizado"
        whatsappNumber={jesusMariaData.landings.vph.whatsapp}
        whatsappMessage={jesusMariaData.landings.vph.message}
        useModal={true}
        sede="Jesús María"
        tratamiento="VPH"
      />
      {/* Preguntas Section */}
      <Questions questions={questionVph} />
      {/* WhatsApp Flotante */}
      <FloatingWhatsApp
        phoneNumber={jesusMariaData.landings.vph.whatsapp}
        message={jesusMariaData.landings.vph.message}
        tooltipText="¡Conversemos por WhatsApp!"
        useModal={true}
        sede="Jesús María"
        tratamiento="VPH"
      />
      {/* Footer */}
      <Footer
          address={jesusMariaData.address}
          phone={jesusMariaData.landings.vph.whatsapp}
          email={jesusMariaData.email}
          socials={jesusMariaData.socials}
        />
    </TitleProvider>
  );
} 