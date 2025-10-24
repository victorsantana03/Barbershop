import Header from "./components/header";
import { Button } from "./components/ui/button";

import Image from "next/image";
import { searchOptions } from "./_constants/search";
import { db } from "./_lib/prisma";
import BarberShopItem from "./components/barbershop-item";
import BookingItem from "./components/booking-item";

import Search from "./components/search";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "./components/ui/card";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        where: { userId: (session.user as any).id, date: { gte: new Date() } },
        include: { service: { include: { barbershop: true } } },
        orderBy: {
          date: "asc",
        },
      })
    : [];

  return (
    <>
      <Header />

      <div className="p-5">
        {/*TEXTO OLÁ*/}
        <div>
          <h2 className="text-xl">
            Olá, {session?.user ? session.user.name : "bem vindo"}!
          </h2>
          <p className="text-gray-400">
            <span className="capitalize">
              {format(new Date(), "EEEE", { locale: ptBR })},
            </span>
            <span> {format(new Date(), "dd 'de'", { locale: ptBR })} </span>
            <span className="capitalize">
              {format(new Date(), "MMMM", { locale: ptBR })}
            </span>
          </p>
        </div>

        {/*INPUT*/}
        <div className="mt-6">
          <Search />
        </div>

        {/*BUSCA RÁPIDA*/}
        <div className="mt-6 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {searchOptions.map((option) => (
            <Button key={option.title} variant={"secondary"} asChild>
              <Link href={`/barbershops?search=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />

                <p>{option.title}</p>
              </Link>
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
        <h3 className="py-4 text-xs font-bold text-gray-400 uppercase">
          Meus Agendamentos
        </h3>
        {confirmedBookings.length > 0 ? (
          <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={booking}
                confirmedBookings={confirmedBookings}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent>
              <p className="text-center text-sm font-semibold">
                Nenhum agendamento marcado por enquanto...
              </p>
            </CardContent>
          </Card>
        )}

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
    </>
  );
}
