import { db } from "../_lib/prisma";
import BarberShopItem from "../components/barbershop-item";
import Header from "../components/header";
import Search from "../components/search";

interface BarberShopPageProps {
  searchParams: {
    search?: string;
  };
}

const BarberShopPage = async ({ searchParams }: BarberShopPageProps) => {
  const barbershopServices = await db.barbershopService.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
    include: {
      barbershop: true,
    },
  });
  console.log(barbershopServices);
  return (
    <>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">
          Resultados para: &quot;{searchParams.search}&quot;
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {barbershopServices.map((barbershopService) => (
            <BarberShopItem
              barbershop={barbershopService.barbershop}
              key={barbershopService.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BarberShopPage;
