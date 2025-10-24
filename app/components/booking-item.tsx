"use client";

import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } };
  }>;
}
//TODO: Receber agendamento como prop
const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date);
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cancelar reserva. Tente novamente.");
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-[90%] p-0">
          <CardContent className="flex cursor-pointer justify-between p-0">
            {/*ESQUERDA */}
            <div className="flex flex-col items-start gap-2 py-5 pl-5">
              <Badge variant={isConfirmed ? "default" : "secondary"}>
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p>{booking.service.barbershop.name}</p>
              </div>
            </div>
            {/*DIREITA*/}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 border-t p-5">
          {/*IMAGEM*/}
          <div className="relative min-h-[180px]">
            <Image
              src="/mapa.png"
              alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
              fill
              className="rounded-2xl object-cover"
            />
            <div className="flex justify-center">
              <div className="bg-muted absolute bottom-5 flex w-[90%] items-center justify-center gap-4 rounded-2xl p-2">
                <Avatar className="size-10">
                  <AvatarImage
                    src={booking.service.barbershop.imageUrl}
                    className="object-cover"
                  />
                </Avatar>
                <div className="flex flex-col">
                  <h3 className="font-bold">
                    {booking.service.barbershop.name}
                  </h3>
                  <p className="text-xs">
                    {booking.service.barbershop.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*DETALHES*/}
          <div className="space-y-3">
            <Badge variant={isConfirmed ? "default" : "secondary"}>
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
            <div>
              <Card className="py-2">
                <CardContent className="space-y-4 px-3">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{booking.service.name}</h3>
                    <p className="font-semibold">
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(booking.service.price))}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-400">Data</p>
                    <p>
                      {format(booking.date, "d 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-400">
                      Horário
                    </p>
                    <p>{format(booking.date, "HH:mm", { locale: ptBR })}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-400">
                      Barbearia
                    </p>
                    <p>{booking.service.barbershop.name}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          {/*CONTATO*/}
          <div>
            {booking.service.barbershop.phones.map((phone, i) => (
              <PhoneItem key={i} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter>
          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="flex">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="flex">
                    Cancelar reserva
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Você quer cancelar sua reserva?</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja fazer o cancelamento?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-col items-center">
                    <Button
                      variant="destructive"
                      className="w-[80%]"
                      onClick={() => handleCancelBooking()}
                    >
                      Confirmar
                    </Button>
                    <DialogClose asChild>
                      <Button variant="outline" className="w-[80%]">
                        Voltar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
