"use client";

import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex whitespace-nowrap text-gray-400">
        {pathSegments.map((segment, index) => (
          <span key={index} className="flex items-center">
            <span className="mx-1">/</span>
            <a
              className="underline hover:no-underline"
              href={`/${pathSegments.slice(0, index + 1).join("/")}`}
            >
              {segment}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
}
