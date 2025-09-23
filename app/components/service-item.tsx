"use client";

import { Calendar } from "./ui/calendar";
import { ptBR } from "react-day-picker/locale";
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Barbershop, Booking } from "@prisma/client";
import { addDays, format, set } from "date-fns";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-bookings";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Sheet } from "./ui/sheet";

interface ServiceItemProps {
  service: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    barberShopId: string;
  };
  barbershop?: Pick<Barbershop, "name">;
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

//Não exibir horários que já foram agendados
const getTimeList = (bookings: Booking[]) => {
  const timeList = TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0]);
    const minute = Number(time.split(":")[1]);

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minute,
    );

    if (hasBookingOnCurrentTime) {
      return false;
    }
    return true;
  });
  return timeList;
};

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession();

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [timeSelected, setTimeSelected] = useState<string | undefined>(
    undefined,
  );
  const [dayBookings, setDayBookings] = useState<Booking[]>();
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return;
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      });
      setDayBookings(bookings);
    };
    fetch();
  }, [selectedDay, service.id]);

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined);
    setTimeSelected(undefined);
    setDayBookings([]);
    setBookingSheetIsOpen(false);
  };

  const handleSelectedDay = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleTimeSelected = (time: string) => {
    setTimeSelected(time);
  };

  const handleCreateBooking = async () => {
    //2. Não deixar o usuário reservar se não estiver logado
    try {
      if (!selectedDay || !timeSelected) return;
      const hour = Number(timeSelected.split(":")[0]);
      const minute = Number(timeSelected.split(":")[1]);
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      });

      await createBooking({
        serviceId: service.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userId: (data?.user as any).id,
        date: newDate,
      });
      handleBookingSheetOpenChange();
      toast.success("Reserva criada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar reserva");
    }
  };

  return (
    <div>
      <Card className="p-0">
        <CardContent className="flex gap-3 p-3">
          {/*IMAGEM*/}
          <div className="relative min-h-[110px] min-w-[110px]">
            <Image
              src={service.imageUrl}
              fill
              alt={service.name}
              className="rounded-lg object-cover"
            />
          </div>

          {/*TEXTO*/}
          <div className="flex h-[110px] w-full flex-col justify-between">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-primary text-sm font-semibold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant={"secondary"}
                  onClick={() => setBookingSheetIsOpen(true)}
                >
                  Reservar
                </Button>

                <SheetContent>
                  <SheetHeader className="border-b">
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <div className="flex w-full justify-center border-b px-5">
                    <Calendar
                      selected={selectedDay}
                      onSelect={handleSelectedDay}
                      disabled={{ before: addDays(new Date(), 1) }}
                      mode="single"
                      locale={ptBR}
                      className="w-full"
                      classNames={{
                        month: "flex flex-col justify-center w-full",
                        caption_label: "capitalize",
                      }}
                    />
                  </div>

                  {selectedDay && (
                    <div className="flex gap-2 overflow-x-auto border-b px-5 pb-4 [&::-webkit-scrollbar]:hidden">
                      {getTimeList(dayBookings ?? []).map((time) => (
                        <Button
                          key={time}
                          variant={
                            timeSelected === time ? "default" : "outline"
                          }
                          className="rounded-full"
                          onClick={() => handleTimeSelected(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {timeSelected && selectedDay && (
                    <div className="px-5">
                      <Card className="py-2">
                        <CardContent className="space-y-4 px-3">
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{service.name}</h3>
                            <p className="font-semibold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.price))}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm font-semibold text-gray-400">
                              Data
                            </p>
                            <p>
                              {format(selectedDay, "d 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm font-semibold text-gray-400">
                              Horário
                            </p>
                            <p>{timeSelected}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm font-semibold text-gray-400">
                              Barbearia
                            </p>
                            <p>{barbershop?.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  <SheetFooter>
                    <Button
                      disabled={timeSelected && selectedDay ? false : true}
                      onClick={handleCreateBooking}
                    >
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceItem;
