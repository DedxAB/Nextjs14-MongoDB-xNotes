import Link from 'next/link';

import { cn } from '@/lib/utils';
import { playfair_font } from '@/utils/fonts';

import RightNavLinks from './RightNavLinks';

const Navbar = async () => {
  return (
    <nav className="max-w-6xl relative mx-auto px-4 flex justify-between items-center py-4">
      <Link href={`/`}>
        <h1 className={cn('font-bold text-2xl md:text-3xl', playfair_font)}>
          Dedx
          <span className="text-gradient-primary">Notes</span>
        </h1>
      </Link>

      <RightNavLinks />
    </nav>
  );
};

export default Navbar;
