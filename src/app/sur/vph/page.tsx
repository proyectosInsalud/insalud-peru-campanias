import { TestimonialBubbles } from "../../components/TestimonialBubbles";
import { Treatment } from "../../components/Treatment/Treatment";
import { AboutDevice } from "../../components/AboutDevice";
import { Questions } from "../../components/Questions";
import { AppointmentCta } from "../../components/AppointmentCta";
import { HeroContact } from "../../components/hero-1/HeroContact";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { questionVph } from "@/data/questions/questionVph";
import { surData } from "@/data/sedes/sur";
import { Footer } from "@/app/components/Footer";
import { TitleProvider } from '@/contexts/TitleContext'
import { messagesVph } from "@/data/messages/messagesVph";
import { surVphBenefits } from "@/data/surVphBenefits";

export default function VphSur() {
  return (
    <TitleProvider sede="Sur" tratamiento="VPH">
      {/* Hero Section */}
      <HeroContact
        title="¿Tienes verrugas?"
        subtitle="Podrías tener VPH"
        image="/campanas/vph-jesus-maria/assets/images/sections/header/u-hero-image.png"
        imageMobile="/campanas/vph-jesus-maria/assets/images/sections/header/grafico-vph-mobile.png"
        description="Agenda tu cita ahora y elimina las verrugas con nuestro tratamiento avanzado con Cauterización."
        gestorData={surData.landings.vph}
        tratamiento="VPH"
        sede="Sur"
        redirectToWhatsapp={{
            number: surData.landings.vph.whatsapp,
            message: surData.landings.vph.message
        }}
      />
      {/* Testimonios Section */}
      <TestimonialBubbles
        messages={messagesVph}
      />
      {/* Beneficios Section */}
      <section id="beneficios">
        <Treatment
          titleWithColors="¿Por qué tratarse con {cyan}Cauterización? {/cyan}"
          subtitle="Conoce los beneficios que te ofrece este tratamiento."
          cards={surVphBenefits}
        />
      </section>
      {/* Tecnología Section */}
      <AboutDevice
           titleWithColors="Equipos {blue}profesionales de primer nivel y{/blue} Médicos especialistas {blue}certificados{/blue}"
          multipleImages={false}
          srcDesktop={"/campanas/vph-jesus-maria/assets/images/sections/main/vph-device.png"}
          alt="Dispositivo de cauterización VPH"
      />
      {/* Call to Action */}
      <AppointmentCta
        title="Elimina las verrugas de forma segura y efectiva con nuestro tratamiento de Cauterización"
        description="Nuestro equipo de especialistas está listo para ayudarte a dar el primer paso hacia tu bienestar."
        titleMobile="Elimina las verrugas de forma segura y efectiva"
        whatsappNumber={surData.landings.vph.whatsapp}
        whatsappMessage={surData.landings.vph.message}
        useModal={true}
        sede="Sur"
        tratamiento="VPH"
      />
      {/* Preguntas Section */}
      <Questions questions={questionVph} />
      {/* WhatsApp Flotante */}
      <FloatingWhatsApp
        phoneNumber={surData.landings.vph.whatsapp}
        message={surData.landings.vph.message}
        tooltipText="¡Conversemos por WhatsApp!"
        useModal={true}
        sede="Sur"
        tratamiento="VPH"
      />
      {/* Footer */}
      <Footer
          address={surData.address}
          phone={surData.landings.vph.whatsapp}
          email={surData.email}
          socials={surData.socials}
        />
        </TitleProvider>
  );
} 