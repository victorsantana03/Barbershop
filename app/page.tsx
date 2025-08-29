import { SearchIcon } from "lucide-react";
import Header from "./components/header";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Avatar, AvatarImage } from "./components/ui/avatar";
import { searchOptions } from "./_constants/search";

export default function Home() {
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
            className="rounded-2xl object-cover"
          />
        </div>

        {/*AGENDAMENTOS*/}
        <div>
          <h3 className="py-4 text-xs font-bold text-gray-400 uppercase">
            Agendamentos
          </h3>

          <Card className="p-0">
            <CardContent className="flex justify-between p-0">
              {/*ESQUERDA */}
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge>Confirmado</Badge>
                <h3 className="font-semibold">Corte de cabelo</h3>

                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                  </Avatar>
                  <p>Vintage Barber</p>
                </div>
              </div>
              {/*DIREITA*/}
              <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sm">Fevereiro</p>
                <p className="text-2xl">06</p>
                <p className="text-sm">09:45</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
