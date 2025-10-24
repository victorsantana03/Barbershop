import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import BookingItem from "../components/booking-item";
import Header from "../components/header";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import { Card, CardContent } from "../components/ui/card";

const Bookings = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return notFound();
  }
  const confirmedBookings = await db.booking.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: { userId: (session.user as any).id, date: { gte: new Date() } },
    include: { service: { include: { barbershop: true } } },
    orderBy: {
      date: "asc",
    },
  });
  const concludedBookings = await db.booking.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: { userId: (session.user as any).id, date: { lt: new Date() } },
    include: { service: { include: { barbershop: true } } },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <h3 className="py-4 text-xs font-bold text-gray-400 uppercase">
          Confirmados
        </h3>
        {confirmedBookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent>
              <h3 className="text-center font-semibold">
                Nenhum agendamento marcado por enquanto...
              </h3>
            </CardContent>
          </Card>
        )}

        <h3 className="py-4 text-xs font-bold text-gray-400 uppercase">
          Finalizados
        </h3>
        {concludedBookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {concludedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent>
              <h3 className="text-center font-semibold">
                Nenhum serviço finalizado por enquanto...
              </h3>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default Bookings;
