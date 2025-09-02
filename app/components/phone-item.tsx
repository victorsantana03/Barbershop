"use client";

import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PhoneItemProps {
  phone: string;
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    toast.success("Número copiado");
  };
  return (
    <div className="flex items-center justify-between pt-2">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p>{phone}</p>
      </div>

      <Button variant={"outline"} size={"sm"} onClick={() => handleCopyPhone()}>
        Copiar
      </Button>
    </div>
  );
};

export default PhoneItem;
