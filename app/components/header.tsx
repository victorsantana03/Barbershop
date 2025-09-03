import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, House, LogOut, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { searchOptions } from "../_constants/search";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Card className="rounded-none rounded-b-lg">
        <CardContent className="flex items-center justify-between">
          <Image alt="Fsw Barber" src="/logo.svg" width={130} height={22} />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="p-4">
                {/*FAÇA SEU LOGIN*/}
                {/* <div className="flex items-center justify-between border-b pb-5">
                  <h3>Olá. Faça seu login!</h3>
                  <Button size={"sm"}>
                    <LogOut />
                  </Button>
                </div> */}

                {/*CONTA*/}
                <div className="flex items-center gap-3 border-b pb-5">
                  <Avatar>
                    <AvatarImage src="https://media.licdn.com/dms/image/v2/D4D03AQE-edik1KpR2Q/profile-displayphoto-scale_200_200/B4DZi_TvYVGsAc-/0/1755556280856?e=1759968000&v=beta&t=xIau3hZWKtHqqHsCwm3RfsNfHKXfcZU1K09XNTRSP_U" />
                  </Avatar>

                  <div>
                    <h3 className="text-sm font-bold">Victor Alves Santana</h3>
                    <p className="text-xs">viclucigei.123@gmail.com</p>
                  </div>
                </div>

                {/*INICIO*/}
                <div className="space-y-3 border-b py-5">
                  <SheetClose asChild>
                    <Button className="w-full justify-start py-6" asChild>
                      <Link href="/">
                        <House />
                        <p>Inicio</p>
                      </Link>
                    </Button>
                  </SheetClose>

                  <Button className="w-full justify-start py-6" variant="ghost">
                    <Calendar />
                    <p>Agendamentos</p>
                  </Button>
                </div>

                {/*SERVIÇOS*/}
                <div className="flex flex-col gap-4 py-5">
                  {searchOptions.map((option) => (
                    <Button
                      key={option.title}
                      variant={"ghost"}
                      className="justify-start space-x-1"
                    >
                      <Image
                        src={option.imageUrl}
                        alt={option.title}
                        width={16}
                        height={16}
                      />

                      <p>{option.title}</p>
                    </Button>
                  ))}
                </div>

                {/*SAIR DA CONTA*/}
                <div className="border-t pt-5">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <LogOut />
                    <p>Sair da conta</p>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
