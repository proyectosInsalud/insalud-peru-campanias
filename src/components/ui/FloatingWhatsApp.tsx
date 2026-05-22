"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { WhatsappModal } from "@/components/ui/WhatsappModal";
import { trackToSheets } from "@/utils/trackToSheets";

type FloatingWhatsAppProps = {
  phoneNumber: string; // Número sin el +, ej: "51987654321"
  message: string; // Mensaje predefinido
  tooltipText?: string; // Solo esta personalización es útil
  onWhatsAppClick?: () => void;
  useModal?: boolean;
  sede?: string;
  tratamiento?: string;
};

export const FloatingWhatsApp = ({
  phoneNumber,
  message,
  tooltipText = "¡Conversemos por WhatsApp!",
  onWhatsAppClick,
  useModal = false,
  sede,
  tratamiento
}: FloatingWhatsAppProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Valores fijos para simplicidad y consistencia
  const backgroundColor = "#25D366";
  const textColor = "#ffffff";

  // Construir URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Notificacion a google tag manager
    if(typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "whatsapp_floating_click",
            phoneNumber: phoneNumber,
            message: message,
        });
    }
    
    if (onWhatsAppClick) {
        onWhatsAppClick();
    }
    
    if (useModal) {
      setIsExpanded(false);
      setIsModalOpen(true);
    } else {
      window.open(whatsappUrl, "_blank");
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Botón principal */}
      <div
        className="fixed bottom-6 right-6 group cursor-pointer z-50"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        {/* Tooltip */}
        {isTooltipVisible && !isExpanded && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-200">
            {tooltipText}
            <div className="absolute top-full -mt-1 right-4 w-2 h-2 bg-gray-800 rotate-45" />
          </div>
        )}

        {/* Botón expandido */}
        {isExpanded && (
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-2xl p-4 w-80 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor }}
                >
                  <MessageCircle className="w-5 h-5" style={{ color: textColor }} />
                </div>
                <span className="font-semibold text-gray-800">WhatsApp</span>
              </div>
              <button
                onClick={toggleExpanded}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">¿Necesitas ayuda?</p>
              <p className="text-xs text-gray-500">{message}</p>
            </div>

            <button
              onClick={handleClick}
              className="w-full py-2 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              style={{ backgroundColor }}
            >
              <MessageCircle className="w-4 h-4" />
              Iniciar conversación
            </button>
          </div>
        )}

        {/* Botón principal */}
        <div
          className={`
            w-16 h-16
            rounded-full 
            flex 
            items-center 
            justify-center 
            shadow-lg 
            hover:shadow-xl 
            transition-all 
            duration-300 
            hover:scale-110 
            active:scale-95
            ${isExpanded ? 'scale-90' : ''}
          `}
          style={{ backgroundColor }}
          onClick={isExpanded ? toggleExpanded : handleClick}
          onDoubleClick={toggleExpanded}
        >
          <MessageCircle 
            className="w-8 h-8 animate-pulse" 
            style={{ color: textColor }} 
          />
        </div>

        {/* Indicador de notificación */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">1</span>
        </div>
      </div>

      {/* Overlay para cerrar cuando está expandido */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Modal de captura */}
      <WhatsappModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        whatsappNumber={phoneNumber}
        whatsappMessage={message}
        sede={sede}
        tratamiento={tratamiento}
        origen="whatsapp_flotante"
      />
    </>
  );
}; 