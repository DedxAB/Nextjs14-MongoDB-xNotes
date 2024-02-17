import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ThemeToggle";

const Header = () => {
  return (
    <nav className="flex justify-between items-center py-3 rounded">
      <Link href={`/`}>
        <h1 className="font-bold text-2xl">
          Dedx<span className="text-orange-500">Notes</span>
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-4">
        <ThemeToggle />
        <Link href={`/add-topic`}>
          <Button className="font-bold rounded">Add Topic</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
