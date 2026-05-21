"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { formLeadsSchema } from "@/schemas";
import { FormLeads } from "@/types";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
      fetch("/api/sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "formulario",
          nombres: values.nombres,
          telefono: values.telefono,
          turno: values.turno,
          sede: sede,
          tratamiento: tratamiento,
        }),
      }).catch((e) => console.error("Sheets error:", e));

      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        if(typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "form_submission",
          });
        }
        toast.success("Tus datos fueron enviados correctamente. Nos contactaremos contigo pronto 😊");
        form.reset();

        // Save lead to external service
        try {
          await saveLead({
            id_lead_source: 15,
            name: values.nombres,
            email: gestorData?.email || "",
            phone: `51${values.telefono}`,
            reason: tratamiento || "",
            sede: sede || "",
            date: new Date().toISOString(),
            url: `https://app.insalud.pe${typeof window !== "undefined" ? window.location.pathname : ""}`,
            id_announcement: "",
          });
        } catch (saveError) {
          console.error("Error saving lead to external service:", saveError);
        }

        if (redirectToWhatsapp && typeof window !== "undefined") {
          const whatsappUrl = `https://wa.me/${redirectToWhatsapp.number}?text=${encodeURIComponent(redirectToWhatsapp.message)}`;
          window.open(whatsappUrl, "_blank");
        }
      } else {
        toast.error(data.mensaje || "Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al enviar el formulario");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="px-4">
              <section className="relative container max-w-7xl mx-auto px-4 md:px-10 lg:px-14 bg-in-blue py-8 md:py-12 lg:py-16 rounded-3xl z-10 space-y-8">
        <div>
          <h2 className="text-center text-xl text-white font-semibold font-in-nunito">
            <span className="hidden lg:block">
              Agenda tu cita ahora y recupera tu confianza con Ondas de Choque
              de Alta Frecuencia, un tratamiento no invasivo y clíni.camente
              probado para mejorar la erección de forma natural y duradera
            </span>
            <span className="block lg:hidden font-black">
              Agenda tu cita ahora y elimina las verrugas sin dañar tu piel.
            </span>
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2 lg:gap-4 mb-0 md:mb-2">
              <FormField
                control={form.control}
                name="nombres"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input
                        className="bg-in-cyan md:bg-white font-normal md:font-medium text-in-blue placeholder:text-in-blue placeholder:font-normal placeholder:text-sm md:placeholder:font-medium py-6"
                        placeholder="Nombres y Apellidos"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-in-orange font-in-nunito text-sm md:absolute -bottom-6 left-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem className="mb-2 md:mb-0 relative">
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-in-cyan md:bg-white font-normal md:font-medium text-in-blue placeholder:text-in-blue placeholder:font-normal placeholder:text-sm md:placeholder:font-medium py-6"
                          placeholder="Celular (9 dígitos)"
                          maxLength={9}
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            field.onChange(value);
                          }}
                        />
                        {field.value && field.value.length > 0 && field.value.length < 9 && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                            {field.value.length}/9
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-in-orange font-in-nunito text-sm md:absolute -bottom-6 left-0" />
                  </FormItem>
                )}
              />
              <div className="hidden md:block">
                <FormField
                  control={form.control}
                  name="turno"
                  render={({ field, fieldState }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger
                            className={`bg-white font-medium py-6 ${
                              fieldState.error
                                ? "border-red-500 border"
                                : "border-gray-300"
                            } [&>span]:text-in-blue [&>span]:font-medium`}
                          >
                            <SelectValue placeholder="Elige el turno" />
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
                      <FormMessage className="md:absolute -bottom-6 left-0 font-in-nunito text-in-orange text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="block md:hidden">
                <FormField
                  control={form.control}
                  name="turno"
                  render={({ field }) => (
                    <FormItem className="text-in-blue mb-2 md:mb-0">
                      <Label
                        className="text-white font-normal pb-2"
                        htmlFor="turno"
                      >
                        Elige un turno para contactarte *
                      </Label>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            className="border-in-orange w-6 h-6 [&>span>svg]:size-5 [&>span>svg]:fill-in-orange [&>span>svg]:stroke-in-orange"
                            value="mañana"
                            id="mañana"
                          />
                          <Label
                            className="text-white font-normal"
                            htmlFor="mañana"
                          >
                            Mañana (9am a 1pm)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            className="border-in-orange w-6 h-6 [&>span>svg]:size-5 [&>span>svg]:fill-in-orange [&>span>svg]:stroke-in-orange"
                            value="tarde"
                            id="tarde"
                          />
                          <Label
                            className="text-white font-normal"
                            htmlFor="tarde"
                          >
                            Tarde (3pm a 7pm)
                          </Label>
                        </div>
                      </RadioGroup>
                      <FormMessage className="font-in-nunito text-in-orange text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-in-orange text-white py-6 cursor-pointer disabled:opacity-50 mb-2 md:mb-0"
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
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};
