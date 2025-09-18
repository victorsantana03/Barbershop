import Image from "next/image";
import { Card, CardContent } from "./ui/card";

import { Button } from "./ui/button";

import { Sheet, SheetTrigger } from "./ui/sheet";

import SheetContentBooking from "./sheet-content-booking";
import { db } from "../_lib/prisma";

interface ServiceItemProps {
  service: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number; // aqui já não é Decimal
    barberShopId: string;
  };
}

const ServiceItem = async ({ service }: ServiceItemProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: service.barberShopId,
    },
  });

  if (!barbershop) return;
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

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"secondary"}>Reservar</Button>
                </SheetTrigger>
                <SheetContentBooking
                  service={service}
                  barbershop={barbershop}
                />
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceItem;
