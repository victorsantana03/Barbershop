import { Calendar, House, LogIn, LogOut, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { searchOptions } from "../_constants/search";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const SidebarButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"secondary"} size={"icon"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          {/*FAÇA SEU LOGIN*/}
          <div className="flex items-center justify-between border-b pb-5">
            <h3>Olá. Faça seu login!</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"sm"}>
                  <LogIn />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Faça login na plataforma</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-center">
                    Conecte-se usando sua conta do Google
                  </p>
                  <Button className="h-12 w-full" variant="outline">
                    <Image
                      src="/google.svg"
                      width={16}
                      height={16}
                      alt="Google"
                    />
                    <p className="font-bold">Google</p>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/*CONTA*/}
          {/* <div className="flex items-center gap-3 border-b pb-5">
            <Avatar>
              <AvatarImage src="https://media.licdn.com/dms/image/v2/D4D03AQE-edik1KpR2Q/profile-displayphoto-scale_200_200/B4DZi_TvYVGsAc-/0/1755556280856?e=1759968000&v=beta&t=xIau3hZWKtHqqHsCwm3RfsNfHKXfcZU1K09XNTRSP_U" />
            </Avatar>

            <div>
              <h3 className="text-sm font-bold">Victor Alves Santana</h3>
              <p className="text-xs">viclucigei.123@gmail.com</p>
            </div>
          </div> */}

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
          {/* <div className="border-t pt-5">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogOut />
              <p>Sair da conta</p>
            </Button>
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarButton;
