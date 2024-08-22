"use client";

import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type StatsParagraphProps = {
  year: string;
};

export default function StatsParagraph({ year }: StatsParagraphProps) {
  const [data, setData] = useState(null);

  const url = new URL("/api/sketch-rank/votes-cast", window.location.origin);
  url.searchParams.append("year", year);

  useEffect(() => {
    // Fetch the data from your API endpoint
    fetch("/api/sketch-rank/votes-cast")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.result.rows[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function Factoids() {
    return (
      <ul className="list-disc list-inside">
        <li>
          There have been{" "}
          {data ? data.total_votes : <Skeleton inline={true} width={"3rem"} />}{" "}
          votes so far.
        </li>
        <li>
          In the last 7 days there have been{" "}
          {data ? (
            data.votes_last_7_days
          ) : (
            <Skeleton inline={true} width={"2rem"} />
          )}{" "}
          votes.
        </li>
        <li>
          In the last 24 hours there have been{" "}
          {data ? (
            data.votes_last_1_day
          ) : (
            <Skeleton inline={true} width={"2rem"} />
          )}{" "}
          votes.
        </li>
      </ul>
    );
  }

  return (
    <div className="border-gray-200 border-2 p-2 rounded-lg w-fit">
      <Factoids />
    </div>
  );
}
