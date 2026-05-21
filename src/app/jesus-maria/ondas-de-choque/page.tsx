import { TestimonialBubbles } from "../../components/TestimonialBubbles";
import { Treatment } from "../../components/Treatment/Treatment";
import { AboutDevice } from "../../components/AboutDevice";
import { AppointmentCta } from "../../components/AppointmentCta";
import { Questions } from "../../components/Questions";
import { HeroContact } from "../../components/hero-2/HeroContact";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { questionDisfuncion } from "@/data/questions/questionDisfuncion";
import { jesusMariaData } from "@/data/sedes/jesus-maria";
import { Footer } from "@/app/components/Footer";
//import { PageWrapper } from '@/components/ui/PageWrapper'
import { TitleProvider } from '@/contexts/TitleContext'
import { messagesOndasChoque } from "@/data/messages/messagesOndasChoque";
import { treatmentBenefits } from "@/data/treatmentBenefits";

export default function DisfuncionJesusMaria() {
    return (
        //<PageWrapper 
          //  sede="Jesús María" 
            //tratamiento="Ondas de Choque"
            //spinWheelProps={{
               // autoShowDelay: 1,
                //spinDuration: 5,
                //firstSpinAngle: 315,
                //secondSpinAngle: 225,
                //showCloseButton: false
            //}}
        //>
        <TitleProvider sede="Jesús María" tratamiento="Ondas de Choque">
            {/* Hero Section */}
            <HeroContact
                gestorData={jesusMariaData.landings.ondasChoque}
                tratamiento="Ondas de Choque"
                sede="Jesús María"
                redirectToWhatsapp={{
                    number: jesusMariaData.landings.ondasChoque.whatsapp,
                    message: jesusMariaData.landings.ondasChoque.message,
                }}
            />
            
            {/* Testimonios Section */}
            <section id="testimonios">
                <TestimonialBubbles 
                    titleWithColors="La {cyan}disfunción eréctil{/cyan} no solo afecta tu cuerpo. Afecta cómo te {cyan}ves a ti mismo{/cyan}"
                    messages={messagesOndasChoque}
                />
            </section>
            
            {/* Tratamiento Section */}
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
                    srcDesktop={"/campanas/disfuncion/assets/images/sections/main/u-disfuncion-device.png"}
                    alt="Dispositivo de disfunción eréctil"
                />
            </section>
            
            {/* Call to Action */}
            <AppointmentCta 
                title="Recupera tu confianza con Ondas de Choque de Alta Frecuencia, un tratamiento no invasivo y clínicamente probado para mejorar la erección de forma natural y duradera."
                description="Nuestro equipo de especialistas está listo para ayudarte a dar el primer paso hacia tu bienestar."
                titleMobile="Recupera tu confianza con un tratamiento clínico eficaz y personalizado"
                whatsappNumber={jesusMariaData.landings.ondasChoque.whatsapp}
                whatsappMessage={jesusMariaData.landings.ondasChoque.message}
                useModal={true}
                sede="Jesús María"
                tratamiento="Ondas de Choque"
            />
            
            {/* Preguntas Section */}
            <section id="preguntas">
                <Questions questions={questionDisfuncion} />
            </section>
            
            {/* WhatsApp Flotante */}
            <FloatingWhatsApp 
                phoneNumber={jesusMariaData.landings.ondasChoque.whatsapp}
                message={jesusMariaData.landings.ondasChoque.message}
                tooltipText="¿Dudas sobre disfunción eréctil?"
                useModal={true}
                sede="Jesús María"
                tratamiento="Ondas de Choque"
            />
                          <Footer
          address={jesusMariaData.address}
          phone={jesusMariaData.landings.ondasChoque.whatsapp}
          email={jesusMariaData.email}
          socials={jesusMariaData.socials}
        />
    </TitleProvider>
    )
} 