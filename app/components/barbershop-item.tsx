import { Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { Barbershop } from "@prisma/client";
import Link from "next/link";

interface BarberShopItemProps {
  barbershop: Barbershop;
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  return (
    <Card key={barbershop.id} className="min-w-[180px] p-0">
      <CardContent className="w-full p-1">
        <div className="relative h-[159px]">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="rounded-lg object-cover"
          />
          <Badge
            className="absolute top-1 left-1 rounded-2xl opacity-70"
            variant={"default"}
          >
            <div className="flex items-center gap-1">
              <Star width={18} />
              <p>5,0</p>
            </div>
          </Badge>
        </div>

        <div className="flex flex-col gap-2 p-2">
          <h3 className="truncate font-bold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button variant={"secondary"} asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarberShopItem;
