import { AboutDevice } from "@/app/components/AboutDevice";
import { AppointmentCta } from "@/app/components/AppointmentCta";
import { Footer } from "@/app/components/Footer";
import { HeroContact } from "@/app/components/hero-2/HeroContact";
import { Questions } from "@/app/components/Questions";
import { TestimonialBubbles } from "@/app/components/TestimonialBubbles";
import { Treatment } from "@/app/components/Treatment/Treatment";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { questionDisfuncion } from "@/data/questions/questionDisfuncion";
import { golfData } from "@/data/sedes/golf";
//import { PageWrapper } from '@/components/ui/PageWrapper'
import { TitleProvider } from '@/contexts/TitleContext'
import { messagesOndasChoque } from "@/data/messages/messagesOndasChoque";
import { treatmentBenefits } from "@/data/treatmentBenefits";

export default function OndasGolfPage() {
  return (
    //<PageWrapper 
      //sede="Golf" 
      //tratamiento="Ondas de Choque"
      //spinWheelProps={{
        //autoShowDelay: 1,
        //spinDuration: 5,
        //firstSpinAngle: 315,
        //secondSpinAngle: 225,
        //showCloseButton: false
      //}}
    //>
    <TitleProvider sede="Golf" tratamiento="Ondas de Choque">
      {/* Hero Section */}
      <HeroContact 
        gestorData={golfData.landings.ondasChoque}
        tratamiento="Ondas de Choque"
        sede="Golf"
        redirectToWhatsapp={{
          number: golfData.landings.ondasChoque.whatsapp,
          message: golfData.landings.ondasChoque.message,
        }}
      />

      {/* Testimonios Section */}
      <section id="testimonios">
        <TestimonialBubbles
          titleWithColors="La {cyan}disfunción eréctil{/cyan} no solo afecta tu cuerpo. Afecta cómo te {cyan}ves a ti mismo{/cyan}"
          messages={messagesOndasChoque}
        />
      </section>

      {/* Beneficios Section */}
      <section id="beneficios">
        <Treatment
          titleWithColors="¿Por qué tratarse con {cyan}Ondas de Choque?{/cyan}"
          subtitle="Descubre los beneficios de esta tecnología de vanguardia."
          cards={treatmentBenefits}
        />
      </section>

      {/* Tecnología Section */}
      <section id="tecnologia">
        <AboutDevice
          titleWithColors="Equipos{blue} que estimulan la {/blue}circulación sanguínea {blue} y promueve erecciones más firmes y duraderas.{/blue}"
          multipleImages={false}
          srcDesktop={
            "/campanas/disfuncion/assets/images/sections/main/u-disfuncion-device.png"
          }
          alt="Dispositivo de disfunción eréctil"
        />
      </section>

                  {/* Call to Action */}
                  <AppointmentCta 
                title="Recupera tu confianza con Ondas de Choque de Alta Frecuencia, un tratamiento no invasivo y clínicamente probado para mejorar la erección de forma natural y duradera."
                description="Nuestro equipo de especialistas está listo para ayudarte a dar el primer paso hacia tu bienestar."
                titleMobile="Recupera tu confianza con un tratamiento clínico eficaz y personalizado"
                whatsappNumber={golfData.landings.ondasChoque.whatsapp}
                whatsappMessage={golfData.landings.ondasChoque.message}
                useModal={true}
                sede="Golf"
                tratamiento="Ondas de Choque"
            />

      {/* Preguntas Section */}
      <section id="preguntas">
        <Questions questions={questionDisfuncion} />
      </section>

      {/* WhatsApp Flotante */}
      <FloatingWhatsApp
        phoneNumber={golfData.landings.ondasChoque.whatsapp}
        message={golfData.landings.ondasChoque.message}
        tooltipText="¿Dudas sobre disfunción eréctil?"
        useModal={true}
        sede="Golf"
        tratamiento="Ondas de Choque"
      />

      <Footer
          address={golfData.address}
          phone={golfData.landings.ondasChoque.whatsapp}
          email={golfData.email}
          socials={golfData.socials}
      />
    </TitleProvider>
  );
}
