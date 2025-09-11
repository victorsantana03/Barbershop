import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import SidebarButton from "./sidebar-button";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Card className="rounded-none rounded-b-lg">
        <CardContent className="flex items-center justify-between">
          <Link href="/">
            <Image alt="Fsw Barber" src="/logo.svg" width={130} height={22} />
          </Link>

          <SidebarButton />
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
