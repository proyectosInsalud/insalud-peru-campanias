"use client";

import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface WhatsappModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
  whatsappMessage: string;
  sede?: string;
  tratamiento?: string;
  origen: "whatsapp_cta" | "whatsapp_flotante";
}

export function WhatsappModal({
  isOpen,
  onClose,
  whatsappNumber,
  whatsappMessage,
  sede = "No especificada",
  tratamiento = "No especificado",
  origen,
}: WhatsappModalProps) {
  const [nombres, setNombres] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombres || !telefono) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (telefono.length < 9) {
      toast.error("El número debe tener al menos 9 dígitos");
      return;
    }

    setIsLoading(true);

    // Guardar en Google Sheets
    try {
      await fetch("/api/sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: origen,
          nombres,
          telefono,
          sede,
          tratamiento,
        }),
      });
      
      // Notificacion a Google Tag Manager
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "whatsapp_modal_submission",
          origen: origen,
        });
      }
    } catch (error) {
      console.error("Error al guardar en Sheets:", error);
    } finally {
      setIsLoading(false);
      
      // Redirigir a WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank");
      
      // Limpiar y cerrar
      setNombres("");
      setTelefono("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 relative">
        {/* Header */}
        <div className="bg-[#25D366] p-6 text-white text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex justify-center mb-3">
            <div className="bg-white/20 p-3 rounded-full">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold font-in-poppins">¡Hablemos por WhatsApp!</h3>
          <p className="text-white/90 text-sm mt-1">Déjanos tus datos para atenderte mejor</p>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-in-nunito">
                Nombres y Apellidos *
              </label>
              <input
                type="text"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#25D366] focus:border-[#25D366] outline-none transition-all"
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-in-nunito">
                Celular *
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 9) setTelefono(val);
                }}
                placeholder="Ej. 987654321"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#25D366] focus:border-[#25D366] outline-none transition-all"
                required
                disabled={isLoading}
                maxLength={9}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 mt-2 shadow-lg shadow-[#25D366]/30"
            >
              {isLoading ? (
                <span className="animate-pulse">Procesando...</span>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5" />
                  Ir a WhatsApp
                </>
              )}
            </button>
          </form>
          
          <p className="text-xs text-center text-gray-400 mt-4 font-in-nunito">
            Tus datos están seguros con nosotros.
          </p>
        </div>
      </div>
    </div>
  );
}
