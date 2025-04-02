"use client";

import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <div className="text-gray-400 flex flex-wrap min-w-0">
      {pathSegments.map((segment, index) => (
        <span key={index.toString() + "/"} className="flex items-center">
          <span className="whitespace-nowrap"> / </span>
          <span className="underline hover:no-underline whitespace-nowrap">
            <a href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
              {segment}
            </a>
          </span>
        </span>
      ))}
    </div>
  );
}
