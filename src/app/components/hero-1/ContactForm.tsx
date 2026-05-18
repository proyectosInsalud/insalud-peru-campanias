"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formLeadsSchema } from "@/schemas";
import { FormLeads } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cdn } from "@/utils/cdn";
import { useState } from "react";
import { saveLead } from "@/services/SaveLeads";

type ContactFormProps = {
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
};

export const ContactForm = ({ gestorData, tratamiento, sede, redirectToWhatsapp }: ContactFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormLeads>({
    resolver: zodResolver(formLeadsSchema),
    defaultValues: {
      nombres: "",
      telefono: "",
      turno: "",
      gestorEmail: gestorData?.email,
      gestorNombre: gestorData?.gestor,
      tratamiento: tratamiento,
      sede: sede,
    },
  });

  async function onSubmit(values: FormLeads) {
    setIsLoading(true);
    try {
      // Guardar en Sheets siempre, antes del mail
      fetch('/api/sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: "formulario",
          nombres: values.nombres,
          telefono: values.telefono,
          turno: values.turno,
          sede: sede,
          tratamiento: tratamiento
        }),
      }).catch((e) => console.error('Sheets error:', e));

      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          gestorEmail: gestorData?.email,
          gestorNombre: gestorData?.gestor,
          tratamiento: tratamiento,
          sede: sede,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Notificacion a google tag manager
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "form_submission",
          });
        }
        toast.success(`Tus datos fueron enviados correctamente. Nos contactaremos contigo pronto 😊`);
        form.reset();

        // Save lead to external service (Callhub)
        try {
          await saveLead({
            id_lead_source: 1, // Assuming a default value
            name: values.nombres,
            email: gestorData?.email || '',
            phone: `51${values.telefono}`,
            reason: tratamiento || '',
            sede: sede || '',
            date: new Date().toISOString(),
            url: `https://app.insalud.pe${typeof window !== 'undefined' ? window.location.pathname : ''}`,
            id_announcement: '', // Optional
          });
        } catch (saveError) {
          console.error('Error saving lead to external service:', saveError);
          // Don't show error to user as the main submission succeeded
        }

        // Redirect to WhatsApp if specified
        if (redirectToWhatsapp && typeof window !== "undefined") {
          const whatsappUrl = `https://wa.me/${redirectToWhatsapp.number}?text=${encodeURIComponent(redirectToWhatsapp.message)}`;
          window.open(whatsappUrl, "_blank");
        }

      } else {
        toast.error(data.mensaje || "Error al enviar el formulario");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error al enviar el formulario");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2 bg-white md:bg-transparent px-6 py-8 md:p-0 rounded-lg">
          <h2 className="text-center text-2xl font-semibold font-in-poppins text-in-cyan-base md:hidden mb-6">
            Agenda tu cita ahora y elimina las verrugas sin dañar tu piel
          </h2>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-2 mb-6 md:mb-2">
            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-in-cyan md:bg-white font-normal md:font-medium text-in-blue placeholder:text-in-blue placeholder:font-normal placeholder:text-sm md:placeholder:font-medium py-5 focus:border-in-orange"
                      {...field}
                      placeholder="Nombres y apellidos"
                    />
                  </FormControl>
                  <FormMessage className="font-in-nunito" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-in-cyan md:bg-white font-normal md:font-medium text-in-blue placeholder:text-in-blue placeholder:font-normal placeholder:text-sm md:placeholder:font-medium py-5 focus:border-in-orange"
                      {...field}
                      placeholder="Celular*"
                      maxLength={9}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="font-in-nunito " />
                </FormItem>
              )}
            />
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0 md:mb-2">
            <div className="hidden md:block">
              <FormField
                control={form.control}
                name="turno"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className={`bg-white font-medium py-5 ${fieldState.error
                              ? "border-red-500 border"
                              : "border-gray-300"
                            } [&>span]:text-in-blue [&>span]:font-medium`}
                        >
                          <SelectValue placeholder="Elige el turno*" />
                        </SelectTrigger>
                        <SelectContent position="popper" sideOffset={4} className="w-[var(--radix-select-trigger-width)] min-w-0">
                          <SelectItem
                            className="text-in-blue hover:!bg-in-cyan hover:!text-in-blue focus:!bg-in-cyan focus:!text-in-blue data-[highlighted]:!bg-in-cyan data-[highlighted]:!text-in-blue"
                            value="mañana"
                          >
                            Mañana
                          </SelectItem>
                          <SelectItem
                            className="text-in-blue hover:!bg-in-cyan hover:!text-in-blue focus:!bg-in-cyan focus:!text-in-blue data-[highlighted]:!bg-in-cyan data-[highlighted]:!text-in-blue"
                            value="tarde"
                          >
                            Tarde
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="font-in-nunito" />
                  </FormItem>
                )}
              />
            </div>
            <div className="block md:hidden pb-2">
              <FormField
                control={form.control}
                name="turno"
                render={({ field }) => (
                  <FormItem className="text-in-blue">
                    <Label className="text-in-blue font-normal pb-2" htmlFor="turno">Elige un turno para contactarte *</Label>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem className="border-in-orange w-6 h-6 [&>span>svg]:size-5 [&>span>svg]:fill-in-orange [&>span>svg]:stroke-in-orange" value="mañana" id="mañana" />
                        <Label className="text-in-blue font-normal" htmlFor="mañana">Mañana (9am a 1pm)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem className="border-in-orange w-6 h-6 [&>span>svg]:size-5 [&>span>svg]:fill-in-orange [&>span>svg]:stroke-in-orange" value="tarde" id="tarde" />
                        <Label className="text-in-blue font-normal" htmlFor="tarde">Tarde (3pm a 7pm)</Label>
                      </div>
                    </RadioGroup>
                    <FormMessage className="font-in-nunito" />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-in-orange hover:bg-in-orange-hover text-white py-5 cursor-pointer disabled:opacity-50 mb-2 md:mb-0"
            >
              <span className="text-white">
                <div className="flex items-center gap-2">
                  <Calendar />
                  <span className="hidden md:block">
                    {isLoading ? "Enviando..." : "Agendar cita"}
                  </span>
                  <span className="block md:hidden">
                    {isLoading ? "ENVIANDO..." : "¡AGENDA TU CITA AHORA!"}
                  </span>
                </div>
              </span>
            </Button>
          </section>
          <p className="font-medium font-in-nunito md:font-normal text-in-blue text-xs md:pl-1">Al llenar el formulario, Ud. acepta los
            <Link className="text-in-orange" href={cdn("/campanas/vph-jesus-maria/assets/pdf/terminos-y-condiciones.pdf")} target="_blank"> {' '}
              Términos y Condiciones / Política de Privacidad
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};
