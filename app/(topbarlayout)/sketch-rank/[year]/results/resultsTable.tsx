"use client";

import React, { useState, useEffect } from "react";
import { getImageFileFromImageId, getImageUrlFromImageName } from "../utils";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

type ResultsTableProps = {
  year: string;
};

export default function ResultsTable({ year }: ResultsTableProps) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = new URL("/api/sketch-rank/results", window.location.origin);
    url.searchParams.append("year", year);

    fetch(url.toString())
      .then((response) => response.json())
      .then((responseData) => setData(responseData.result.rows))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="border-2 rounded-lg sm:p-2 border-gray-200">
      <table className="divide-y-2 divide-gray-200 text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr className="">
            <th className="whitespace-nowrap px-1 py-2 font-medium ">Image</th>
            <th className="whitespace-nowrap px-1 sm:px-4 py-2 font-medium">
              Wins
            </th>
            <th className="whitespace-nowrap px-1 sm:px-4 py-2 font-medium">
              Losses
            </th>
            <th className="whitespace-nowrap px-1 sm:px-4 py-2 font-medium">
              Win Ratio (%)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data
            ? data.map((row) => (
                <tr key={row.id} className="">
                  <td className="whitespace-nowrap p-1 text-gray-700 text-center">
                    <Link href={`/sketch-rank/results/${row.id}`}>
                      <Image
                        src={getImageUrlFromImageName(
                          year,
                          getImageFileFromImageId(row.id)
                        )}
                        width={100}
                        height={100}
                        alt={""}
                        priority={true}
                      />
                    </Link>
                  </td>
                  <td className="whitespace-nowrap p-1 text-gray-700 text-center">
                    {row.totalwins}
                  </td>
                  <td className="whitespace-nowrap p-1 text-gray-700 text-center">
                    {row.totallosses}
                  </td>
                  <td className="whitespace-nowrap p-1 text-gray-700 text-center">
                    {(parseFloat(row.winpercent) * 100).toFixed(1)}
                  </td>
                </tr>
              ))
            : Array.from({ length: 10 }, (_, index) => (
                <tr key={index} className="">
                  <td className="whitespace-nowrap p-1 text-gray-700 text-center leading-none">
                    <Skeleton width={100} height={100} />
                  </td>
                  <td className="whitespace-nowrap p-1 text-gray-700 text-center">
                    <Skeleton width={30} />
                  </td>
                  <td className="whitespace-nowrap p-1 text-gray-700 text-center">
                    <Skeleton width={30} />
                  </td>
                  <td className="whitespace-nowrap p-1 text-gray-700 text-center">
                    <Skeleton width={30} />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
