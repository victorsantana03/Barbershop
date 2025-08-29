import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

//TODO: Receber agendamento como prop
const BookingItem = () => {
  return (
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
  );
};

export default BookingItem;
