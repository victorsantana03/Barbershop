import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Image from "next/image";

const SignInDialog = () => {
  const handleLoginWhitGoogle = () => {
    signIn("google");
  };
  return (
    <DialogContent className="w-[90%]">
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p className="text-center">Conecte-se usando sua conta do Google</p>
        <Button
          className="h-12 w-full"
          variant="outline"
          onClick={handleLoginWhitGoogle}
        >
          <Image src="/google.svg" width={16} height={16} alt="Google" />
          <p className="font-bold">Google</p>
        </Button>
      </div>
    </DialogContent>
  );
};

export default SignInDialog;
