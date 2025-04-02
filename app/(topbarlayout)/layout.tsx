import Image from "next/image";
import BreadCrumbs from "./breadCrumbs";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex border-b-2 border-gray-300 p-2 items-center">
        <Link href={"/"} className="flex-shrink-0">
          <Image
            src="/icon.png"
            alt="Website Logo"
            height={48}
            width={48}
          ></Image>
        </Link>
        <BreadCrumbs></BreadCrumbs>
      </div>
      {children}
    </>
  );
}
