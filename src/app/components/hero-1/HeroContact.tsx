"use client"
import Image from "next/image"
import { cdn } from "@/utils/cdn"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ContactForm } from "./ContactForm";
import { useTitleContext } from "@/contexts/TitleContext";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

type HeroContactProps = {
    image: string;
    imageMobile: string;
    title: string;
    subtitle: string;
    description: string;
    gestorData?: {
        gestor: string;
        email: string;
        whatsapp: string;
        message: string;
    };
    tratamiento?: string;
    sede?: string;
    redirectToWhatsapp?: {
        number: string;
        message: string;
    };
}

export const HeroContact = ({ 
    image, 
    imageMobile, 
    title, 
    subtitle, 
    description, 
    gestorData, 
    tratamiento, 
    sede,
    redirectToWhatsapp
}: HeroContactProps) => {

    const { justClaimedPrize } = useTitleContext();
    const contactFormRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    // Títulos dinámicos basados en si se reclamó el premio
    const displayTitle = justClaimedPrize 
        ? "¡Felicidades! 🎉" 
        : title;
    
    const displaySubtitle = justClaimedPrize 
        ? "Has ganado una consulta gratuita" 
        : subtitle;

    useGSAP(() => {

        // Contact Form
        gsap.set(contactFormRef.current, {
            opacity: 0,
            x: -150,
        })

        gsap.to(contactFormRef.current, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.inOut",
        })

        // Image
        gsap.set(imageRef.current, {
            rotate: 20,
            opacity: 0,
            x: 150,
        })

        gsap.to(imageRef.current, {
            rotate: 0,
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.inOut",
        })
    })

  return (
    <div className="bg-in-cyan pb-12 md:pb-32">
        <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8">
                <div ref={contactFormRef} className="md:col-span-7">
                    <div className="space-y-4 lg:space-y-8 mb-4 text-left">
                        <h1 className=" text-4xl sm:text-5xl md:text-4xl font-bold md:font-semibold font-in-nunito md:font-in-poppins text-in-cyan-base ">
                            {displayTitle}
                            <span className="hidden md:block text-2xl pt-1 lg:text-4xl font-semibold text-in-blue">{displaySubtitle}</span> 
                        </h1>
                        <Image 
                            src={cdn(imageMobile)} 
                            alt="Podrias tener VPH y no saberlo" 
                            width={350}     
                            height={500} 
                            className="w-full md:hidden mb-12"
                            priority
                            unoptimized
                        />
                        <p className="hidden md:block font-medium font-in-nunito text-in-blue text-base lg:text-lg">{description}</p>
                    </div>
                    <ContactForm 
                        gestorData={gestorData}
                        tratamiento={tratamiento}
                        sede={sede}
                        redirectToWhatsapp={redirectToWhatsapp}
                    />
                </div>
                <div ref={imageRef} className="md:col-span-5 hidden md:block">
                    <Image 
                        src={cdn(image)} 
                        alt="Hero Image" 
                        width={500}     
                        height={500} 
                        className=""
                        unoptimized
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
