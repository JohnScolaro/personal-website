import Image from "next/image";
import BreadCrumbs from "./breadCrumbs";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex w-full items-center border-b-2 border-gray-300 p-2 overflow-hidden">
        <Link href="/" className="flex-shrink-0">
          <Image src="/icon.png" alt="Website Logo" height={48} width={48} />
        </Link>

        <div className="flex-1 min-w-0">
          <BreadCrumbs />
        </div>
      </div>

      {children}
    </>
  );
}
