import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { BarbershopService } from "@prisma/client";
import { Button } from "./ui/button";

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
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
          <div className="flex h-[110px] flex-col justify-between">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-primary text-sm font-semibold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Button variant={"secondary"}>Reservar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceItem;
