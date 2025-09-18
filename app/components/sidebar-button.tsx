"use client";

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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { signIn, useSession, signOut } from "next-auth/react";

const SidebarButton = () => {
  const handleLoginWhitGoogle = () => {
    signIn("google");
  };

  const handleSignOut = () => {
    signOut();
  };

  const session = useSession();

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
          {!session.data?.user && (
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
                    <Button
                      className="h-12 w-full"
                      variant="outline"
                      onClick={handleLoginWhitGoogle}
                    >
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
          )}

          {/*CONTA*/}
          {session.data?.user && (
            <div className="flex items-center gap-3 border-b pb-5">
              <Avatar className="size-15">
                <AvatarImage src={session.data?.user?.image || ""} />
              </Avatar>

              <div>
                <h3 className="text-sm font-bold">
                  {session.data?.user?.name}
                </h3>
                <p className="text-xs">{session.data?.user?.email}</p>
              </div>
            </div>
          )}

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
              <SheetClose key={option.title} asChild>
                <Button
                  key={option.title}
                  variant={"ghost"}
                  className="justify-start space-x-1"
                  asChild
                >
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
              </SheetClose>
            ))}
          </div>

          {/*SAIR DA CONTA*/}
          {session.data?.user && (
            <div className="border-t pt-5">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={handleSignOut}
              >
                <LogOut />
                <p>Sair da conta</p>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarButton;
