import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export default function Button({ children, href, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`relative px-6 py-2 text-white bg-black rounded-lg transition-all duration-300 hover:opacity-90
        before:absolute before:top-[-2px] before:left-[-2px] before:w-[calc(100%+4px)] before:h-[calc(100%+4px)]
        before:bg-gradient-to-r before:from-red-500 before:via-yellow-400 before:to-blue-500
        before:bg-[length:400%] before:rounded-lg before:blur-sm before:opacity-80
        before:animate-glowing ${className}`}
    >
      {children}
    </Link>
  );
}


