import { SearchIcon } from "lucide-react";
import Header from "./components/header";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Image from "next/image";
import { searchOptions } from "./_constants/search";
import { db } from "./_lib/prisma";
import BarberShopItem from "./components/barbershop-item";
import BookingItem from "./components/booking-item";
import Footer from "./components/footer";

export default async function Home() {
  //TODO: FAZER O COMPONENTE DAS BARBEARIAS RECOMENDADAS
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <>
      <Header />

      <div className="p-5">
        {/*TEXTO OLÁ*/}
        <div>
          <h2 className="text-xl">Olá Miguel!</h2>
          <p className="text-gray-400">Sexta, 2 de Fevereiro</p>
        </div>

        {/*INPUT*/}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/*BUSCA RÁPIDA*/}
        <div className="mt-6 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {searchOptions.map((option) => (
            <Button key={option.title} variant={"secondary"}>
              <div className="flex gap-2">
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                <p>{option.title}</p>
              </div>
            </Button>
          ))}
        </div>

        {/*BANNER*/}
        <div className="relative mt-6 h-[200px] w-full">
          <Image
            src="/banner.svg"
            alt="Agende nos Melhores com FSW Barber"
            fill
            className="rounded-2xl object-contain"
          />
        </div>

        {/*AGENDAMENTOS*/}
        <BookingItem />

        {/*RECOMENDADOS*/}
        <h3 className="mt-6 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h3>
        <div className="mt-4 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/*POPULARES*/}
        <h3 className="mt-6 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h3>
        <div className="mt-4 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
