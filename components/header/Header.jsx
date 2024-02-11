import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <nav className="flex justify-between items-center py-3 rounded">
      <Link href={`/`}>
        <h1 className="font-bold text-2xl">
          Hawt <span className="text-orange-500">CRUD</span>
        </h1>
      </Link>
      <Link href={`/add-topic`}>
        <Button className="font-bold">Add Topic</Button>
      </Link>
    </nav>
  );
};

export default Header;
