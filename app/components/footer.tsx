import { Card, CardContent } from "./ui/card";

const Footer = () => {
  return (
    <footer>
      <Card className="mt-6 rounded-none">
        <CardContent>
          <p className="text-sm text-gray-400">© 2023 Copyright FSW Barber</p>
        </CardContent>
      </Card>
    </footer>
  );
};

export default Footer;
