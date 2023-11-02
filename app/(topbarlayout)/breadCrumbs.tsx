"use client";

import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <div className="text-gray-400 flex">
      {pathSegments.map((segment, index) => (
        <div key={index.toString() + "/"}>
          <span className="whitespace-pre-wrap" key={index.toString() + "/"}>
            {" / "}
          </span>
          <span key={index} className="underline hover:no-underline">
            <a
              key={index.toString() + "link"}
              href={`/${pathSegments.slice(0, index + 1).join("/")}`}
            >
              {segment}
            </a>
          </span>
        </div>
      ))}
    </div>
  );
}
