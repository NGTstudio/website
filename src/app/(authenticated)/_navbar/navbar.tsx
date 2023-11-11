import { ModeButton, WalletButton } from "@/app/(authenticated)/_navbar/buttons";
import NavItems from "@/app/(authenticated)/_navbar/NavItems";
import Logo from "@/app/icon.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

  return (
    <div className="border-b fixed w-full bg-background">
      <div className="flex h-16 items-center px-4">
        <Link href="/">
          <Image src={Logo} alt="EvoVerses" width={48} height={48} />
        </Link>
        <nav className="items-center ml-2 sm:space-x-4 sm:mx-6 lg:space-x-6"> {/* lg:flex  */}
          <NavItems />

        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <WalletButton />
          <ModeButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;