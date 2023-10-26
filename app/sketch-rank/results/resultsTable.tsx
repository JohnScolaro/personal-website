"use client";

import React, { useState, useEffect } from "react";
import { getImageFileFromImageId, getImageUrlFromImageName } from "../utils";
import Image from "next/image";

export default function ResultsTable() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch the data from your API endpoint
    fetch("/api/sketch-rank/results")
      .then((response) => response.json())
      .then((responseData) => setData(responseData.result.rows))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <table className="divide-y-2 divide-black bg-white text-sm w-min">
      <thead className="ltr:text-left rtl:text-right">
        <tr className="">
          <th className="whitespace-nowrap px-4 py-2 font-medium">Image</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">Wins</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">Losses</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">
            Total Score
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data &&
          data.map((row) => (
            <tr key={row.id} className="">
              <td className="whitespace-nowrap p-1 text-gray-700 text-center">
                <Image
                  src={getImageUrlFromImageName(
                    getImageFileFromImageId(row.id)
                  )}
                  width={100}
                  height={100}
                  alt={""}
                ></Image>
              </td>
              <td className="whitespace-nowrap p-1 text-gray-700 text-center">
                {row.totalwins}
              </td>
              <td className="whitespace-nowrap p-1 text-gray-700 text-center">
                {row.totallosses}
              </td>
              <td className="whitespace-nowrap p-1 text-gray-700 text-center">
                {row.winsminuslosses}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
