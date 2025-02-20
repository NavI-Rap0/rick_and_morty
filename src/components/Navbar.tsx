import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="relative w-screen">
      <div className="flex items-center justify-between w-full h-32 px-0">
        {/* Логотип */}
        <div className="flex items-center">
          <Image
            src="/logo2.png"
            alt="Logo"
            height={128}
            width={300}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        {/* Посилання */}
        <ul className="flex flex-1 justify-around items-center text-2xl gap-8">
          {["Home", "Characters", "Episodes", "Locations"].map(
            (link, index) => (
              <li key={index} className="group relative">
                <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-[1000ms] ease-in-out w-0 h-0 group-hover:w-32 group-hover:h-32 z-10">
                  <Image
                    src="/portal-rick-and-morty-png-2.gif"
                    alt="Black Hole"
                    width={128}
                    height={128}
                    unoptimized
                  />
                </div>
                <Link
                  href={`/${link.toLowerCase()}`}
                  className="nav_link relative inline-block p-4 transition-transform duration-1000 ease-in-out group-hover:scale-75 group-hover:animate-pulse z-20 text-blue-400 group-hover:animate-pulse-colors text-shadow-md"
                >
                  {link}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

