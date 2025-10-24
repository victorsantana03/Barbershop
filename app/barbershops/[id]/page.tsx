import { db } from "@/app/_lib/prisma";

import PhoneItem from "@/app/components/phone-item";
import ServiceItem from "@/app/components/service-item";
import SidebarButton from "@/app/components/sidebar-button";
import { Button } from "@/app/components/ui/button";
import { ChevronLeft, MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarberShopPageProps {
  params: {
    id: string;
  };
}

const BarberShopPage = async ({ params }: BarberShopPageProps) => {
  const barbeshop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbeshop) {
    return notFound();
  }

  //Transformando price em Number pois Decimal no client component deu erro
  const serializedBarbershop = {
    ...barbeshop,
    services: barbeshop.services.map((service) => ({
      ...service,
      price: Number(service.price),
    })),
  };

  return (
    <div>
      {/*IMAGEM*/}
      <div className="relative h-[250px] w-full">
        <Image
          src={barbeshop?.imageUrl}
          alt={barbeshop?.name}
          fill
          className="object-cover"
        />
        <Button variant="secondary" className="absolute top-4 left-3" asChild>
          <Link href="/">
            <ChevronLeft />
          </Link>
        </Button>

        <div className="absolute top-4 right-3">
          <SidebarButton />
        </div>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="text-xl font-bold">{barbeshop?.name}</h1>
        {/*ENDEREÇO*/}
        <div className="mt-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={20} />
          <p className="text-sm">{barbeshop?.address}</p>
        </div>
        {/*AVALIAÇÃO*/}
        <div className="mt-2 flex items-center gap-2">
          <StarIcon className="text-primary fill-primary" size={20} />
          <p className="text-sm">5,0 (499 Avaliações)</p>
        </div>
      </div>
      {/*DESCRIÇÃO*/}
      <div className="border-b border-solid p-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase">Sobre Nós</h3>
        <p className="pt-3 text-gray-400">{barbeshop?.description}</p>
      </div>
      {/*SERVIÇOS*/}
      <div className="grid grid-cols-1 gap-4 border-b border-solid p-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase">Serviços</h3>
        {serializedBarbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            barbershop={barbeshop}
          />
        ))}
      </div>
      {/*CONTATO*/}
      <div className="p-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase">Contato</h3>
        <div className="grid grid-cols-1 gap-2">
          {barbeshop.phones.map((phone, i) => (
            <PhoneItem key={phone + i} phone={phone} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarberShopPage;
